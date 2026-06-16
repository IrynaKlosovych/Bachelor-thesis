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


def predict(df):
    return ML_MODEL.predict(df)


def predict_ideal_voter_vectors(
    voters: list[CalculationVotingGroup],
) -> list[CalculationVotingGroup]:
    for voter in voters:
        row = voter.voter_to_ml_row()
        print(row)
        df = pd.DataFrame([row])
        print(df)
        voter_result = predict(df)[0]
        voter.update_preferences(voter_result)
    return voters


def predict_ideal_voter_vectors_by_regions(
    voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
) -> dict[UUID, list[CalculationVotingGroup]]:
    for region, voters in voters_by_regions.items():
        voters_by_regions[region] = predict_ideal_voter_vectors(voters)
    return voters_by_regions


def predict_candidate_voter_similarity(
    voter: CalculationVotingGroup, candidate: CandidateScores
):
    voter_vector = voter.get_ideal_vector()
    cand_vector = candidate.as_vector()
    v1 = np.array(voter_vector).reshape(1, -1)
    v2 = np.array(cand_vector).reshape(1, -1)
    return cosine_similarity(v1, v2)[0][0]


def predict_similarities(
    voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
    candidates: CandidateScoresMap,
) -> dict[UUID, list]:
    result = {}
    for regionId, voters in voters_by_regions.items():
        voters_list = []
        for voter in voters:
            voter_result = []
            for candidateId, candidate in candidates.items():
                score = predict_candidate_voter_similarity(voter, candidate)
                voter_result.append((candidateId, score))
            voter_result = add_priorities(voter_result)
            voters_list.append((voter.id, voter_result))
        result[regionId] = voters_list
    return result
