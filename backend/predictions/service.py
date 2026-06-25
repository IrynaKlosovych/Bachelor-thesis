from uuid import UUID

import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

from domain.candidate_schemas.candidate_scores import CandidateScores
from domain.candidate_schemas.types import CandidateScoresMap
from domain.voter_schemas.calculation_voting_group import (
    CalculationVotingGroup,
)
from predictions.helpers import (
    add_priorities,
    normalize_axes,
    sample_calibrated_preference,
    sample_voter_prediction,
)
from predictions.load_model import load_model
from predictions.ml_config import ENABLE_REAL_CALIBRATION, ENABLE_VOTER_SAMPLING

_ML_MODEL = None


def _get_model():
    global _ML_MODEL
    if _ML_MODEL is None:
        _ML_MODEL = load_model()
    return _ML_MODEL


def _predict(df):
    return _get_model().predict(df)


def _predict_ideal_voter_vectors(
    voters: list[CalculationVotingGroup],
) -> list[CalculationVotingGroup]:
    for voter in voters:
        row = voter.voter_to_ml_row()
        df = pd.DataFrame([row])
        voter_result = _predict(df)[0]
        if ENABLE_REAL_CALIBRATION:
            voter_result = sample_calibrated_preference(voter_result, voter.id.int)
        elif ENABLE_VOTER_SAMPLING:
            voter_result = sample_voter_prediction(voter_result, voter.id.int)
        voter.update_preferences(voter_result)
    return voters


def predict_ideal_voter_vectors_by_regions(
    voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
) -> dict[UUID, list[CalculationVotingGroup]]:
    for region, voters in voters_by_regions.items():
        voters_by_regions[region] = _predict_ideal_voter_vectors(voters)
    return voters_by_regions


WEIGHTS = np.array(
    [
        1.2,  # media_positive
        1.5,  # transparency (дуже важливо)
        1.0,  # program_simplicity
        1.3,  # leadership_strength
        1.6,  # institutional_competence
        1.4,  # anti_populism
        1.0,  # social_focus
        1.8,  # rule_of_law (критично)
    ]
)


def _predict_candidate_voter_similarity(
    voter: CalculationVotingGroup, candidate: CandidateScores
):
    voter_vector = normalize_axes(voter.get_ideal_vector())
    cand_vector = normalize_axes(candidate.as_vector())
    v1 = voter_vector.reshape(1, -1)
    v2 = cand_vector.reshape(1, -1)

    score = cosine_similarity(v1, v2)[0][0]
    return score


def _predict_candidates_for_voter(voter, candidates):
    voter_result = {}
    for candidateId, candidate in candidates.items():
        score = _predict_candidate_voter_similarity(voter, candidate)
        voter_result[candidateId] = {"score": score}
    voter_result = add_priorities(voter_result)
    return voter_result


def predict_president_similarities(
    voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
    candidates: CandidateScoresMap,
) -> dict[UUID, list]:
    for regionId, voters in voters_by_regions.items():
        for voter in voters:
            voter_result = _predict_candidates_for_voter(voter, candidates)
            voter.set_president_candidates_rank(voter_result)
    return voters_by_regions


def predict_party_similarities(
    voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
    candidates: CandidateScoresMap,
) -> dict[UUID, list]:
    for regionId, voters in voters_by_regions.items():
        for voter in voters:
            voter_result = _predict_candidates_for_voter(voter, candidates)
            voter.set_party_candidates_rank(voter_result)
    return voters_by_regions


def predict_party_person_similarities(
    voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
    candidates: CandidateScoresMap,
) -> dict[UUID, list]:
    for regionId, voters in voters_by_regions.items():
        for voter in voters:
            voter_result = _predict_candidates_for_voter(voter, candidates)
            voter.set_party_person_candidates_rank(voter_result)
    return voters_by_regions
