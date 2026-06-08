import json
import numpy as np


def _clean_json(raw: str) -> str:
    raw = raw.strip()
    if raw.startswith("```"):
        lines = raw.split("\n")
        lines = [line for line in lines if not line.strip().startswith("```")]
        raw = "\n".join(lines).strip()
    return raw


def _get_api_key() -> str:
    try:
        from django.conf import settings

        return getattr(settings, "GEMINI_API_KEY_BACHELOR_THESIS", "")
    except Exception:
        return ""


def get_client():
    api_key = _get_api_key()
    if not api_key:
        return None, "GEMINI_API_KEY_BACHELOR_THESIS not set in settings.py"
    try:
        from google import genai

        return genai.Client(api_key=api_key), None
    except ImportError:
        return None, "google-genai not installed — run: pip install google-genai"


def call_llm(client, prompt: str, max_tokens: int = 300) -> dict | list | None:
    try:
        from google.genai import types

        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.1,
                max_output_tokens=max_tokens,
                response_mime_type="application/json",
            ),
        )
        raw = _clean_json(response.text)
        return json.loads(raw)

    except json.JSONDecodeError as e:
        print(f"[LLM] JSON parse failed: {e}")
        return None
    except Exception as e:
        print(f"[LLM] API call failed: {e}")
        return None


def clamp(value, lo: float, hi: float, default: float) -> float:
    try:
        return float(np.clip(float(value), lo, hi))
    except (TypeError, ValueError):
        return default
