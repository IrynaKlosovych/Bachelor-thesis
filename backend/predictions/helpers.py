import json
from collections import defaultdict
from uuid import UUID

import numpy as np

from domain.candidate_schemas.candidates_rank import CandidatesRank
from domain.country_schemas.country_metrics import CountryMetrics
from domain.region_schemas.region import Region
from domain.voter_schemas.calculation_voting_group import (
    CalculationVotingGroup,
)
from domain.voter_schemas.voting_group import VotingGroup
from helpers.sort_voters_by_regions import sort_voters_by_regions
from predictions.ml_config import (
    AXIS_RANGES,
    CALIBRATION_STATS_PATH,
    DEMOGRAPHIC_WEIGHT,
    RESIDUAL_STATS_PATH,
)
from predictions.ml_config import Y_COLS as MODEL_OUTPUT_COLS

_AXIS_LO = np.array([lo for lo, _ in AXIS_RANGES])
_AXIS_HI = np.array([hi for _, hi in AXIS_RANGES])

def _load_residual_std():
    if not RESIDUAL_STATS_PATH.exists():
        return None

    stats = json.loads(RESIDUAL_STATS_PATH.read_text())

    return np.array([stats[col] for col in MODEL_OUTPUT_COLS])

RESIDUAL_STD = _load_residual_std()

def _load_calibration():
    if not CALIBRATION_STATS_PATH.exists():
        return None
    s = json.loads(CALIBRATION_STATS_PATH.read_text())

    idx = [s["columns"].index(c) for c in MODEL_OUTPUT_COLS] if s.get("columns") else None

    def arr(key):
        a = np.asarray(s[key], dtype=float)
        return a[idx] if idx is not None else a

    corr = np.asarray(s["real_corr"], dtype=float)
    if idx is not None:
        corr = corr[np.ix_(idx, idx)]
    try:
        chol = np.linalg.cholesky(corr)
    except np.linalg.LinAlgError:
        chol = np.eye(len(MODEL_OUTPUT_COLS))
    return {
        "real_mean": arr("real_mean"),
        "real_std": arr("real_std"),
        "pred_mean": arr("synth_pred_mean"),
        "pred_std": np.maximum(arr("synth_pred_std"), 1e-9),
        "chol": chol,
    }


_CALIB = _load_calibration()


def sample_calibrated_preference(mean_pred, seed: int) -> np.ndarray:
    mean = np.asarray(mean_pred, dtype=float)
    if _CALIB is None:
        return mean
    beta = DEMOGRAPHIC_WEIGHT
    tilt = (mean - _CALIB["pred_mean"]) / _CALIB["pred_std"]
    rng = np.random.default_rng(seed)
    corr_noise = _CALIB["chol"] @ rng.normal(size=len(mean))
    z = beta * tilt + np.sqrt(1.0 - beta**2) * corr_noise
    return _CALIB["real_mean"] + _CALIB["real_std"] * z


def sample_voter_prediction(mean_pred, seed: int) -> np.ndarray:
    # mean те що передбачено моделлю
    mean = np.asarray(mean_pred, dtype=float)
    if RESIDUAL_STD is None:
        return mean
    # шум для одного і того ж виборця завжди той самий
    rng = np.random.default_rng(seed)
    return mean + rng.normal(0.0, RESIDUAL_STD)


def normalize_axes(vector) -> np.ndarray:
    arr = np.clip(np.asarray(vector, dtype=float), _AXIS_LO, _AXIS_HI)
    # шкала від [-1;1]
    return 2.0 * (arr - _AXIS_LO) / (_AXIS_HI - _AXIS_LO) - 1.0

def create_voters_vectors(
    voters: list[VotingGroup], regions: list[Region], country_decr: CountryMetrics
)-> dict[UUID, list[CalculationVotingGroup]]:
    voters_by_region = sort_voters_by_regions(voters)

    voters_by_region_ml = defaultdict(list)
    for region in regions:
        region_voters = voters_by_region.get(region.id, [])

        for voter in region_voters:
            new_voter = CalculationVotingGroup(
                **voter.model_dump(),
                safety_region=region.safety_level,
                country_state=country_decr,
            )
            voters_by_region_ml[region.id].append(new_voter)
    
    return dict(voters_by_region_ml)


def add_priorities(scored:dict[UUID, dict])->dict[UUID, CandidatesRank]:
    items = [(cand_id, data["score"]) for cand_id, data in scored.items()]

    items = sorted(items, key=lambda x: x[1], reverse=True)

    return {
        cand_id: CandidatesRank.model_validate({
            "score": score,
            "priority": rank + 1
        })
        for rank, (cand_id, score) in enumerate(items)
    }