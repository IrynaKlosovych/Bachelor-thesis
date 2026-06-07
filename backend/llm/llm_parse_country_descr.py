import json
import numpy as np

COUNTRY_FIELDS = [
    "war_status",
    "economic_crisis",
    "corruption_level",
    "media_freedom",
    "political_stability",
]

NEUTRAL_DEFAULTS = {field: 5.0 for field in COUNTRY_FIELDS}

PROMPT_TEMPLATE = """You are a political analyst. Read this country description and rate each dimension from 0 to 10.
 
Country description:
\"\"\"{descr}\"\"\"
 
Scoring guide:
  war_status:          0 = full peace,          10 = active full-scale war
  economic_crisis:     0 = stable economy,      10 = collapse or hyperinflation
  corruption_level:    0 = transparent/clean,   10 = systemic corruption
  media_freedom:       0 = fully censored,      10 = fully free press
  political_stability: 0 = chaos/failed state,  10 = stable democracy
 
Return ONLY a valid JSON object with these 6 keys and numeric values. No explanation, no markdown, no code fences.
 
{{"war_status": <number>, "economic_crisis": <number>, "corruption_level": <number>, "media_freedom": <number>, "political_stability": <number>}}"""


def _clean_json(raw: str) -> str:
    raw = raw.strip()
    if raw.startswith("```"):
        lines = raw.split("\n")
        lines = [line for line in lines if not line.strip().startswith("```")]
        raw = "\n".join(lines).strip()
    return raw


def parse_country_descr(descr: str) -> dict:
    if not descr or not descr.strip():
        return dict(NEUTRAL_DEFAULTS)

    try:
        from django.conf import settings

        api_key = getattr(settings, "GEMINI_API_KEY_BACHELOR_THESIS", "")
    except Exception:
        api_key = ""

    if not api_key:
        print("[LLM] GEMINI_API_KEY_BACHELOR_THESIS not set — using neutral defaults")
        return dict(NEUTRAL_DEFAULTS)

    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=api_key)

        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=PROMPT_TEMPLATE.format(descr=descr.strip()),
            config=types.GenerateContentConfig(
                temperature=0.1,
                max_output_tokens=200,
                response_mime_type="application/json",
            ),
        )

        raw = _clean_json(response.text)
        parsed = json.loads(raw)

        result = {}
        for field in COUNTRY_FIELDS:
            if field not in parsed:
                print(f"[LLM] Missing '{field}' — using 5.0")
                result[field] = 5.0
            else:
                try:
                    result[field] = float(np.clip(float(parsed[field]), 0.0, 10.0))
                except (TypeError, ValueError):
                    result[field] = 5.0

        print(f"[LLM] Parsed: {result}")
        return result

    except ImportError:
        print("[LLM] Package missing — run: pip install google-genai")
        return dict(NEUTRAL_DEFAULTS)

    except json.JSONDecodeError as e:
        print(f"[LLM] JSON parse failed: {e} — using defaults")
        return dict(NEUTRAL_DEFAULTS)

    except Exception as e:
        print(f"[LLM] Gemini error: {e} — using defaults")
        return dict(NEUTRAL_DEFAULTS)
