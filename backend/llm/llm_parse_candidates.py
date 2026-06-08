import numpy as np

from llm.helpers import call_llm, get_client, clamp
from llm.ml_config import CAND_DEFAULTS, CAND_FIELD_RANGES, CAND_AXES

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


def _clamp_scores(raw: dict) -> dict:
    return {
        field: clamp(
            raw.get(field, CAND_DEFAULTS[field]),
            *CAND_FIELD_RANGES[field],
            CAND_DEFAULTS[field],
        )
        for field in CAND_AXES
    }


def _default_scores_from_media(candidate: dict) -> dict:
    media = candidate.get("media", {})
    pos = float(media.get("positive", 5))
    neg = float(media.get("negative", 5))
    return {
        **CAND_DEFAULTS,
        "media_positive": float(np.clip(pos, 0, 10)),
        "transparency": float(np.clip(pos - neg * 0.5 + 5, 0, 10)),
    }


def parse_all_candidates(candidates: list) -> dict:
    if not candidates:
        return {}

    fallback = {c["id"]: _default_scores_from_media(c) for c in candidates}
    client, err = get_client()
    if client is None:
        print(f"[LLM] {err} — using media-derived candidate scores")
        return fallback

    candidates_text = _build_candidates_text(candidates)
    prompt = PROMPT_TEMPLATE.format(candidates_text=candidates_text)

    max_tokens = 200 + len(candidates) * 120

    parsed_list = call_llm(client, prompt, max_tokens=max_tokens)

    if not isinstance(parsed_list, list):
        print("[LLM] Expected array from candidates parse — using fallback")
        return fallback

    result = dict(fallback)
    for item in parsed_list:
        cid = str(item.get("id", ""))
        if cid:
            result[cid] = _clamp_scores(item)

    for cid, scores in result.items():
        name = next((c.get("name", cid) for c in candidates if c["id"] == cid), cid)
        print(f"[LLM] {name}: {scores}")

    return result
