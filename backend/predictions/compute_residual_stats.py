import json

import numpy as np
import pandas as pd

from predictions.load_model import load_model
from predictions.ml_config import DROP_NON_FEATURE, RESIDUAL_STATS_PATH, Y_COLS

TRAIN_PATH = (
    RESIDUAL_STATS_PATH.parent.parent / "data" / "data" / "non-linear-voters.csv"
)

def main():
    model = load_model()
    df = pd.read_csv(TRAIN_PATH)
    X = df.drop(columns=[c for c in DROP_NON_FEATURE if c in df.columns])
    y_true = df[Y_COLS].to_numpy(dtype=float)
    y_pred = np.asarray(model.predict(X), dtype=float)

    residual_std = (y_true - y_pred).std(0) # відхилення наскільки помиляється модель у всіх значеннях по окремості
    stats = {col: float(s) for col, s in zip(Y_COLS, residual_std)}

    RESIDUAL_STATS_PATH.write_text(json.dumps(stats, indent=2))
    print(f"Saved residual std to {RESIDUAL_STATS_PATH}")
    for col, s in stats.items():
        print(f"  {col:<36} {s:.3f}")


if __name__ == "__main__":
    main()