from pathlib import Path
from typing import Any

import joblib

BASE_DIR = Path(__file__).resolve().parent.parent
ML_MODELS_DIR = BASE_DIR / "predictions" / "models"


def load_model():
    print(f"BASE_DIR:{BASE_DIR}")
    print(f"ML_MODELS_DIR:{ML_MODELS_DIR}")
    try:
        name = (ML_MODELS_DIR / "updated_best_model.txt").read_text().strip()
        # model = joblib.load(ML_MODELS_DIR / f"{name}.pkl")
        model: Any = joblib.load(ML_MODELS_DIR / "update_best_model.pkl")
        print(f"[ML] Loaded: {name}")
        return model
    except FileNotFoundError as e:
        print(f"[ML] WARNING: model not found — {e}")
        raise RuntimeError("ML model not found")
