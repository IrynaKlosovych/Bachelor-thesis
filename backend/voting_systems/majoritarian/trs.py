from uuid import UUID

from constants import ELECTION_PASS, VOTER_PROBABILITY_PASS
from domain.region_schemas.region import Region
from domain.voter_schemas.calculation_voting_group import CalculationVotingGroup
from voting_systems.another_tour import AnotherTour
from voting_systems.election_system import ElectionSystem


class TRS(ElectionSystem, AnotherTour):
    def calculate(
        self,
        voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
        candidateIds: list[UUID],
        regions: list[Region] | None = None,
    ) -> tuple[dict[str, dict[UUID, float]], dict[UUID, list[CalculationVotingGroup]]]:
        tours: dict[str, dict[UUID, float]] = {}
        voters_tours: dict = {}
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
                        voters_tours[voter.id] = {"tour_1": candidate_id}
        if total_people_take_part > 0:
            candidate_result_perc = {
                cid: ((candidate_results_num[cid] / total_people_take_part) * 100)
                for cid in candidateIds
            }
        else:
            candidate_result_perc = {cid: 0.0 for cid in candidateIds}
        need_more_tour, top_two = self.need_another_tour(
            ELECTION_PASS, candidate_result_perc
        )
        tours["tour_1"] = candidate_result_perc
        if need_more_tour and top_two is not None:
            candidate_result_perc, voters_by_regions, voters_tours = (
                self.next_calculation(2, voters_by_regions, top_two, voters_tours)
            )
            tours["tour_2"] = candidate_result_perc

        for region, voters in voters_by_regions.items():
            for voter in voters:
                voter.set_voting_systems_presidential(
                    "trs", voters_tours.get(voter.id, {})
                )

        return tours, voters_by_regions

    def need_another_tour(
        self, pass_num: float, candidate_result: dict[UUID, float]
    ) -> tuple[bool, list[UUID]]:
        for cand_id, res in candidate_result.items():
            if res >= pass_num:
                return False, []
        top_two = sorted(
            candidate_result.items(), key=lambda item: item[1], reverse=True
        )[:2]

        top_two_ids = [cand_id for cand_id, _ in top_two]
        return True, top_two_ids

    def next_calculation(
        self,
        tour_num: int,
        voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
        candidateIds: list[UUID],
        voters_tours: dict[UUID, dict[str, UUID]],
    ):
        candidate_results_num = {cid: 0.0 for cid in candidateIds}
        total_people_take_part: float = 0.0
        for region, voters in voters_by_regions.items():
            for voter in voters:
                ranks = voter.president_candidate_similarity

                if (
                    ranks is None
                    or voter.preferences is None
                    or voter.preferences.probability_take_part < VOTER_PROBABILITY_PASS
                ):
                    continue
                else:
                    valid = [cid for cid in candidateIds if cid in ranks]

                    if not valid:
                        continue

                    winner = min(valid, key=lambda cid: ranks[cid].priority)

                    candidate_results_num[winner] += voter.details_descr.peopleCount
                    total_people_take_part += voter.details_descr.peopleCount
                    voters_tours.setdefault(voter.id, {})["tour_2"] = winner
        if total_people_take_part > 0:
            candidate_result_perc = {
                cid: ((candidate_results_num[cid] / total_people_take_part) * 100)
                for cid in candidateIds
            }
        else:
            candidate_result_perc = {cid: 0.0 for cid in candidateIds}
        return candidate_result_perc, voters_by_regions, voters_tours
