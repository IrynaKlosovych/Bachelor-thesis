from typing import Any

import joblib

from predictions.ml_config import ML_MODELS_DIR


def load_model():
    try:
        name = (ML_MODELS_DIR / "updated_best_model.txt").read_text().strip()
        # model = joblib.load(ML_MODELS_DIR / f"{name}.pkl")
        model: Any = joblib.load(ML_MODELS_DIR / "update_best_model.pkl")
        print(f"[ML] Loaded: {name}")
        return model
    except FileNotFoundError as e:
        print(f"[ML] WARNING: model not found — {e}")
        raise RuntimeError("ML model not found")
