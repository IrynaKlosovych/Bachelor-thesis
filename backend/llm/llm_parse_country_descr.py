from llm.ml_config import COUNTRY_DEFAULTS, COUNTRY_RANGES, COUNTRY_COLS
from llm.helpers import call_llm, get_client, clamp

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


def parse_country_descr(descr: str) -> dict:
    if not descr or not descr.strip():
        return dict(COUNTRY_DEFAULTS)

    client, err = get_client()
    if client is None:
        print(f"[LLM] {err} — using country defaults")
        return dict(COUNTRY_DEFAULTS)

    parsed = call_llm(client, PROMPT_TEMPLATE.format(descr=descr.strip()))
    if not isinstance(parsed, dict):
        return dict(COUNTRY_DEFAULTS)

    result = {
        col: clamp(parsed.get(col, 5.0), *COUNTRY_RANGES[col], 5.0)
        for col in COUNTRY_COLS
    }
    print(f"[LLM] Country state parsed: {result}")
    return result
