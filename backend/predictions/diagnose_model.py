from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_error, r2_score

from predictions.load_model import load_model
from predictions.ml_config import DROP_NON_FEATURE, Y_COLS

REAL_PATH = Path(__file__).resolve().parent / "data" / "dataset_real.csv"
TRAIN_PATH = REAL_PATH.parent / "data" / "non-linear-voters.csv"

def evaluate(model, df, label):
    X = df.drop(columns=[c for c in DROP_NON_FEATURE if c in df.columns])
    y_true = df[Y_COLS].to_numpy(dtype=float)
    y_pred = np.asarray(model.predict(X), dtype=float)

    r2 = r2_score(y_true, y_pred, multioutput="raw_values")
    mae = [mean_absolute_error(y_true[:, i], y_pred[:, i]) for i in range(len(Y_COLS))]
    std_true = y_true.std(0)
    std_pred = y_pred.std(0)
    ratio = std_pred / np.maximum(std_true, 1e-9)

    print(f"\n===== {label}  (n={len(df)}) =====")
    print(f"{'axis':<36}{'R2':>7}{'MAE':>8}{'std_true':>10}{'std_pred':>10}{'kept':>7}")
    for i, name in enumerate(Y_COLS):
        print(f"{name:<36}{r2[i]:>7.2f}{mae[i]:>8.2f}"
              f"{std_true[i]:>10.2f}{std_pred[i]:>10.2f}{ratio[i]:>6.0%}")
    print(f"{'MEAN':<36}{r2.mean():>7.2f}{np.mean(mae):>8.2f}"
          f"{std_true.mean():>10.2f}{std_pred.mean():>10.2f}{ratio.mean():>6.0%}")
    return r2, ratio


def main():
    model = load_model()
    train = pd.read_csv(TRAIN_PATH).sample(n=2000, random_state=42)
    real = pd.read_csv(REAL_PATH)

    r2_tr, ratio_tr = evaluate(model, train, "TRAIN (in-distribution)")
    r2_re, ratio_re = evaluate(model, real, "REAL (held-out test)")

    print("\n----- verdict signals -----")
    print(f"train mean R2 = {r2_tr.mean():.2f}   real mean R2 = {r2_re.mean():.2f}")
    print(f"train spread kept = {ratio_tr.mean():.0%}   real spread kept = {ratio_re.mean():.0%}")
    expected = np.sqrt(max(r2_tr.mean(), 0))
    print(f"sqrt(train R2) = {expected:.0%}  <- spread a perfect mean-model would keep")


if __name__ == "__main__":
    main()