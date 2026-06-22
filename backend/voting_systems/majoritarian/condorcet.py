from typing import Literal
from uuid import UUID

from constants import VOTER_PROBABILITY_PASS
from domain.voter_schemas.calculation_voting_group import CalculationVotingGroup
from voting_systems.election_system import ElectionSystem

ResultMatrix = Literal["win", "loss", "same"]


class Condorcet(ElectionSystem):
    def calculate(
        self,
        voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
        candidateIds: list[UUID],
    ):
        pairwise_results = {c1: {c2: 0.0 for c2 in candidateIds} for c1 in candidateIds}

        for voters in voters_by_regions.values():
            for voter in voters:
                ranks = voter.president_candidate_similarity

                if (
                    not ranks
                    or voter.preferences is None
                    or voter.preferences.probability_take_part < VOTER_PROBABILITY_PASS
                ):
                    continue

                for c1 in candidateIds:
                    for c2 in candidateIds:
                        if c1 == c2:
                            continue

                        if ranks[c1].priority < ranks[c2].priority:
                            pairwise_results[c1][c2] += voter.details_descr.peopleCount

        result_matrix: dict[UUID, dict[UUID, dict]] = {}
        for c1 in candidateIds:
            result_matrix[c1] = {}

            for c2 in candidateIds:
                if c1 == c2:
                    result_matrix[c1][c2] = {
                        "expression": "same",
                        "result": "same",
                    }
                    continue

                v1 = pairwise_results[c1][c2]
                v2 = pairwise_results[c2][c1]

                if v1 > v2:
                    expression = f"{int(v1)} > {int(v2)}"
                    result = "win"
                elif v1 < v2:
                    expression = f"{int(v1)} < {int(v2)}"
                    result = "loss"
                else:
                    expression = f"{int(v1)} = {int(v2)}"
                    result = "same"

                result_matrix[c1][c2] = {
                    "expression": expression,
                    "result": result,
                }

        return result_matrix, voters_by_regions
