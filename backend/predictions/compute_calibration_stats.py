import json

import numpy as np
import pandas as pd

from predictions.load_model import load_model
from predictions.ml_config import ML_MODELS_DIR
from predictions.ml_config import Y_COLS as MODEL_OUTPUT_COLS

CALIB_PATH = ML_MODELS_DIR / "calibration_stats.json"
DATA_DIR = ML_MODELS_DIR.parent / "data"
TRAIN_PATH = DATA_DIR / "data" / "non-linear-voters.csv"
REAL_PATH = DATA_DIR / "dataset_real.csv"
ID_COLS = ["voter_id", "snapshot_id", "base_voter_id", "source"]
CORR_SHRINK = 0.1  # легке згладжування бо в реальному наборі 74 рядки, що мало для точності і тому може дати більше шуму, аніж залежності


def main():
    real = pd.read_csv(REAL_PATH)
    yr = real[MODEL_OUTPUT_COLS].to_numpy(dtype=float)
    real_mean = yr.mean(0)
    real_std = yr.std(0)
    corr = np.corrcoef(yr, rowvar=False)
    corr = (1 - CORR_SHRINK) * corr + CORR_SHRINK * np.eye(len(MODEL_OUTPUT_COLS))

    model = load_model()
    synth = pd.read_csv(TRAIN_PATH)
    synth = synth[synth["source"] == "synth"] if "source" in synth.columns else synth
    Xs = synth.drop(columns=[c for c in MODEL_OUTPUT_COLS + ID_COLS if c in synth.columns])
    pred = np.asarray(model.predict(Xs), dtype=float)

    stats = {
        "columns": MODEL_OUTPUT_COLS,
        "real_mean": real_mean.tolist(),
        "real_std": real_std.tolist(),
        "real_corr": corr.tolist(),
        "synth_pred_mean": pred.mean(0).tolist(),
        "synth_pred_std": pred.std(0).tolist(),
    }
    CALIB_PATH.write_text(json.dumps(stats, indent=2))
    print(f"Saved calibration stats -> {CALIB_PATH.name}")
    print(f"{'target':<36}{'real mean':>9}{'real std':>9}{'pred mean':>9}{'pred std':>9}")
    for i, c in enumerate(MODEL_OUTPUT_COLS):
        print(f"{c:<36}{real_mean[i]:>9.2f}{real_std[i]:>9.2f}"
              f"{pred.mean(0)[i]:>9.2f}{pred.std(0)[i]:>9.2f}")


if __name__ == "__main__":
    main()