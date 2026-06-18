from uuid import UUID

from constants import VOTER_PROBABILITY_PASS
from domain.region_schemas.region import Region
from domain.voter_schemas.calculation_voting_group import CalculationVotingGroup
from voting_systems.election_system import ElectionSystem


class USLike(ElectionSystem):
    def calculate(
        self,
        voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
        candidateIds: list[UUID],
        regions: list[Region],
    ) -> tuple[dict[UUID, float], dict[UUID, list[CalculationVotingGroup]]]:
        candidate_results_num_people_by_regions: dict[UUID, dict[UUID, float]] = {}
        for region in regions:
            candidate_results_num_people_by_regions[region.id] = {
                cid: 0.0 for cid in candidateIds
            }
        total_people_take_part: float = 0.0
        for regionId, voters in voters_by_regions.items():
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
                        candidate_results_num_people_by_regions[regionId][
                            candidate_id
                        ] += voter.details_descr.peopleCount
                        total_people_take_part += voter.details_descr.peopleCount
                        voter.set_voting_systems_presidential(
                            "us_like", {"tour_1": candidate_id}
                        )
        winners_by_region = {
            region_id: max(candidates.items(), key=lambda x: x[1])[0]
            for region_id, candidates in candidate_results_num_people_by_regions.items()
        }
        results_sum: dict[UUID, float] = {}
        for regionId, candidateId in winners_by_region.items():
            region = next(r for r in regions if r.id == regionId)
            results_sum[candidateId] = results_sum.get(candidateId, 0.0) + float(
                region.seats
            )
        return results_sum, voters_by_regions
