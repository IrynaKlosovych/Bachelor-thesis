import json
import time

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
    from google.genai import types

    models = [
        "gemini-2.5-flash-lite",
        "gemini-3.1-flash-lite",
    ]
    max_attempts = 3
    for model in models:
        print(f"[LLM] Trying model: {model}")
        for attempt in range(max_attempts):
            try:
                response = client.models.generate_content(
                    model=model,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        temperature=0.1,  # strict analytics
                        max_output_tokens=max_tokens,
                        response_mime_type="application/json",
                    ),
                )
                raw = _clean_json(response.text)
                return json.loads(raw)

            except json.JSONDecodeError as e:
                print(f"[LLM] JSON parse failed: {e}")
                continue
            except Exception as e:
                error = str(e)
                if (
                    "503" in error
                    or "UNAVAILABLE" in error
                    or "429" in error
                    or "RESOURCE_EXHAUSTED" in error
                ):
                    time.sleep(1)
                    continue
                print(f"[LLM] API call failed: {e}")
                break

    print("[LLM] All retries failed")
    return None


def clamp(value, low: float, high: float, default: float) -> float:
    try:
        return float(np.clip(float(value), low, high))
    except (TypeError, ValueError):
        return default
