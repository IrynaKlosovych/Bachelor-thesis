from uuid import UUID

from constants import VOTER_PROBABILITY_PASS
from domain.voter_schemas.calculation_voting_group import CalculationVotingGroup
from voting_systems.election_system import ElectionSystem


class FPTP(ElectionSystem):
    def calculate(
        self,
        voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
        candidateIds: list[UUID],
    ) -> tuple[dict[UUID, float], dict[UUID, list[CalculationVotingGroup]]]:
        candidate_results_num = {cid: 0.0 for cid in candidateIds}
        total_people_take_part: float = 0.0
        for region, voters in voters_by_regions.items():
            for voter in voters:
                ranks = voter.president_candidate_similarity

                if (
                    not ranks
                    or voter.preferences is None
                    or voter.preferences.probability_take_part < VOTER_PROBABILITY_PASS
                ):
                    continue

                for candidate_id, rank in ranks.items():
                    if rank.priority == 1:
                        candidate_results_num[candidate_id] += (
                            voter.details_descr.peopleCount
                        )
                        total_people_take_part += voter.details_descr.peopleCount
        if total_people_take_part > 0:
            candidate_result_perc = {
                cid: ((candidate_results_num[cid] / total_people_take_part) * 100)
                for cid in candidateIds
            }
        else:
            candidate_result_perc = {cid: 0.0 for cid in candidateIds}

        return candidate_result_perc, voters_by_regions

    def set_voter_president_winner(
        self, voters_by_regions: dict[UUID, list[CalculationVotingGroup]]
    ) -> dict[UUID, list[CalculationVotingGroup]]:
        for region, voters in voters_by_regions.items():
            for voter in voters:
                ranks = voter.president_candidate_similarity
                if (
                    not ranks
                    or voter.preferences is None
                    or voter.preferences.probability_take_part < VOTER_PROBABILITY_PASS
                ):
                    continue
                for candidate_id, rank in ranks.items():
                    if rank.priority == 1:
                        voter.set_voting_systems_presidential(
                            "fptp", {"tour_1": candidate_id}
                        )
        return voters_by_regions
