import json
import numpy as np

CANDIDATE_FIELDS = [
    "media_positive",
    "transparency",
    "program_simplicity",
    "leadership_strength",
    "institutional_competence",
    "anti_populism",
    "social_focus",
    "rule_of_law",
]

CANDIDATE_DEFAULTS = {
    "media_positive": 5.0,
    "transparency": 5.0,
    "program_simplicity": 5.0,
    "leadership_strength": 3.0,
    "institutional_competence": 5.0,
    "anti_populism": 5.0,
    "social_focus": 5.0,
    "rule_of_law": 5.0,
}

FIELD_RANGES = {
    "media_positive": (0, 10),
    "transparency": (0, 10),
    "program_simplicity": (0, 10),
    "leadership_strength": (1, 5),
    "institutional_competence": (0, 10),
    "anti_populism": (0, 10),
    "social_focus": (0, 10),
    "rule_of_law": (0, 10),
}


PROMPT_TEMPLATE = """You are a political analyst. Rate each candidate based on their profile.

Candidates:
{candidates_text}

For each candidate rate these dimensions:
  media_positive:           0=mostly negative coverage,   10=overwhelmingly positive
  transparency:             0=opaque/hides information,   10=fully transparent
  program_simplicity:       0=complex nuanced policy,     10=simple slogans only
  leadership_strength:      1=consensus/democratic,       5=strong authoritarian leader
  institutional_competence: 0=no government experience,  10=deep institutional expertise
  anti_populism:            0=full populist,              10=expert-driven, zero populism
  social_focus:             0=free market/individual,     10=social programs/government role
  rule_of_law:              0=undermines courts/law,      10=fully respects institutions

Return ONLY a valid JSON array. Each object must have the candidate id and all 8 scores.
No explanation, no markdown, no code fences.

[{{"id": "<candidate_id>", "media_positive": <n>, "transparency": <n>, "program_simplicity": <n>, "leadership_strength": <n>, "institutional_competence": <n>, "anti_populism": <n>, "social_focus": <n>, "rule_of_law": <n>}}]"""

def _build_candidates_text(candidates: list) -> str:
    lines = []
    for c in candidates:
        media = c.get("media", {})
        lines.append(
            f"---\n"
            f"ID: {c['id']}\n"
            f"Name: {c.get('name', 'Unknown')}\n"
            f"Experience: {c.get('experience', 'Not provided')}\n"
            f"Program/Promises: {c.get('promise', 'Not provided')}\n"
            f"Media positive score: {media.get('positive', 5)}/10\n"
            f"Media negative score: {media.get('negative', 5)}/10\n"
            f"Election rating: {c.get('election_rating', 0)}%"
        )
    return "\n".join(lines)


def _clamp_scores(raw_scores: dict) -> dict:
    result = {}
    for field in CANDIDATE_FIELDS:
        lo, hi = FIELD_RANGES[field]
        default = CANDIDATE_DEFAULTS[field]
        if field not in raw_scores:
            result[field] = default
        else:
            try:
                result[field] = float(np.clip(float(raw_scores[field]), lo, hi))
            except (TypeError, ValueError):
                result[field] = default
    return result


def _default_scores_from_media(candidate: dict) -> dict:
    media = candidate.get("media", {})
    pos = float(media.get("positive", 5))
    neg = float(media.get("negative", 5))
    return {
        "media_positive": float(np.clip(pos, 0, 10)),
        "transparency": float(np.clip(pos - neg * 0.5 + 5, 0, 10)),
        "program_simplicity": 5.0,
        "leadership_strength": 3.0,
        "institutional_competence": 5.0,
        "anti_populism": 5.0,
        "social_focus": 5.0,
        "rule_of_law": 5.0,
    }

def parse_all_candidates(candidates: list) -> dict:
    if not candidates:
        return {}

    fallback = {c["id"]: _default_scores_from_media(c) for c in candidates}

    try:
        from django.conf import settings

        api_key = getattr(settings, "GEMINI_API_KEY_BACHELOR_THESIS", "")
    except Exception:
        api_key = ""

    if not api_key:
        print(
            "[LLM] GEMINI_API_KEY_BACHELOR_THESIS not set — using media-derived defaults"
        )
        return fallback

    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=api_key)

        candidates_text = _build_candidates_text(candidates)
        prompt = PROMPT_TEMPLATE.format(candidates_text=candidates_text)

        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.1,
                max_output_tokens=500,
                response_mime_type="application/json",
            ),
        )

        raw = response.text.strip()

        if raw.startswith("```"):
            lines = [line for line in raw.split("\n") if not line.strip().startswith("```")]
            raw = "\n".join(lines).strip()

        parsed_list = json.loads(raw)

        if not isinstance(parsed_list, list):
            print("[LLM] Expected array, got something else — using fallback")
            return fallback

        result = dict(fallback) 
        for item in parsed_list:
            cid = str(item.get("id", ""))
            if not cid:
                continue
            result[cid] = _clamp_scores(item)

        print(f"[LLM] Parsed {len(parsed_list)} candidates")
        for cid, scores in result.items():
            name = next((c.get("name", cid) for c in candidates if c["id"] == cid), cid)
            print(f"  {name}: {scores}")

        return result

    except json.JSONDecodeError as e:
        print(f"[LLM] JSON parse failed: {e} — using fallback")
        return fallback

    except Exception as e:
        print(f"[LLM] Gemini error: {e} — using fallback")
        return fallback
