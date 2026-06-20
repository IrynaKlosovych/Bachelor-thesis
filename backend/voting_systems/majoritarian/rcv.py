from uuid import UUID

from constants import ELECTION_PASS, VOTER_PROBABILITY_PASS
from domain.voter_schemas.calculation_voting_group import CalculationVotingGroup
from voting_systems.another_tour import AnotherTour
from voting_systems.election_system import ElectionSystem


class RCV(ElectionSystem, AnotherTour):
    def calculate(
        self,
        voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
        candidateIds: list[UUID],
    ):
        tours: dict = {}
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
        need_more_tour, new_cand = self.need_another_tour(
            ELECTION_PASS, candidate_result_perc
        )
        tours["tour_1"] = candidate_result_perc
        if need_more_tour and new_cand is not None:
            tours, voters_by_regions, voters_tours = self.next_calculation(
                2, voters_by_regions, new_cand, tours, voters_tours
            )

        for region, voters in voters_by_regions.items():
            for voter in voters:
                voter.set_voting_systems_presidential(
                    "rcv", voters_tours.get(voter.id, {})
                )

        return tours, voters_by_regions

    def need_another_tour(self, pass_num: float, candidate_result: dict[UUID, float]):
        for cand_id, res in candidate_result.items():
            if res >= pass_num:
                return False, []
        new_without_last = sorted(
            candidate_result.items(), key=lambda item: item[1], reverse=True
        )[: candidate_result.__len__() - 1]

        new_ids = [cand_id for cand_id, _ in new_without_last]
        return True, new_ids

    def next_calculation(
        self,
        tour_num: int,
        voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
        candidates: list[UUID],
        tours: dict[str, dict[UUID, float]],
        voters_tours: dict[UUID, dict[str, UUID]],
    ):
        candidate_results_num = {cid: 0.0 for cid in candidates}
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
                    valid = [cid for cid in candidates if cid in ranks]

                    if not valid:
                        continue

                    winner = min(valid, key=lambda cid: ranks[cid].priority)

                    candidate_results_num[winner] += voter.details_descr.peopleCount
                    total_people_take_part += voter.details_descr.peopleCount
                    voters_tours.setdefault(voter.id, {})[f"tour_{tour_num}"] = winner
        if total_people_take_part > 0:
            candidate_result_perc = {
                cid: ((candidate_results_num[cid] / total_people_take_part) * 100)
                for cid in candidates
            }
        else:
            candidate_result_perc = {cid: 0.0 for cid in candidates}

        need_more_tour, new_cand = self.need_another_tour(
            ELECTION_PASS, candidate_result_perc
        )
        tours[f"tour_{tour_num}"] = candidate_result_perc
        if need_more_tour and new_cand is not None:
            tours, voters_by_regions, voters_tours = self.next_calculation(
                tour_num + 1, voters_by_regions, new_cand, tours, voters_tours
            )

        return tours, voters_by_regions, voters_tours
