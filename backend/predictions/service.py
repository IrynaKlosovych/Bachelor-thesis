from uuid import UUID

import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

from domain.calculation_schemas.candidates.candidate_scores import CandidateScores
from domain.calculation_schemas.types import CandidateScoresMap
from domain.calculation_schemas.voters.calculation_voting_group import (
    CalculationVotingGroup,
)
from predictions.helpers import add_priorities
from predictions.load_model import load_model

ML_MODEL = load_model()


def _predict(df):
    return ML_MODEL.predict(df)


def _predict_ideal_voter_vectors(
    voters: list[CalculationVotingGroup],
) -> list[CalculationVotingGroup]:
    for voter in voters:
        row = voter.voter_to_ml_row()
        print(row)
        df = pd.DataFrame([row])
        print(df)
        voter_result = _predict(df)[0]
        voter.update_preferences(voter_result)
    return voters


def predict_ideal_voter_vectors_by_regions(
    voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
) -> dict[UUID, list[CalculationVotingGroup]]:
    for region, voters in voters_by_regions.items():
        voters_by_regions[region] = _predict_ideal_voter_vectors(voters)
    return voters_by_regions


def _predict_candidate_voter_similarity(
    voter: CalculationVotingGroup, candidate: CandidateScores
):
    voter_vector = voter.get_ideal_vector()
    cand_vector = candidate.as_vector()
    v1 = np.array(voter_vector).reshape(1, -1)
    v2 = np.array(cand_vector).reshape(1, -1)
    return cosine_similarity(v1, v2)[0][0]


def _predict_candidates_for_voter(voter, candidates):
    voter_result={}
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
