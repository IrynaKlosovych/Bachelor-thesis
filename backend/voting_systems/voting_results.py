from typing import Any
from uuid import UUID

from domain.region_schemas.region import Region
from domain.voter_schemas.calculation_voting_group import CalculationVotingGroup
from voting_systems.majoritarian.condorcet import Condorcet
from voting_systems.majoritarian.fptp import FPTP
from voting_systems.majoritarian.rcv import RCV
from voting_systems.majoritarian.trs import TRS
from voting_systems.majoritarian.us_like import USLike


def presidential_result(
    voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
    candidateIds: list[UUID],
    regions: list[Region],
) -> tuple[
    dict[str, dict[str, dict[UUID, float]]],
    dict[UUID, list[CalculationVotingGroup]],
    dict[UUID, UUID],
]:
    voting_result: dict[str, dict[str, dict[UUID, float]] | Any] = {}
    # FPTP
    fptp = FPTP()
    fptp_result, voters_by_regions = fptp.calculate(voters_by_regions, candidateIds)
    voters_by_regions = fptp.set_voter_president_winner(voters_by_regions)
    voting_result["fptp"] = {"tour_1": fptp_result}

    # TRS
    trs = TRS()
    trs_result_by_tours, voters_by_regions = trs.calculate(
        voters_by_regions, candidateIds
    )
    voting_result["trs"] = trs_result_by_tours
    # US_like
    us_like = USLike()
    us_result, voters_by_regions, win_by_reg_us_like = us_like.calculate(
        voters_by_regions, candidateIds, regions
    )
    voting_result["us_like"] = {"tour_1": us_result}
    # RCV
    rcv = RCV()
    rcv_result_by_tours, voters_by_regions = rcv.calculate(
        voters_by_regions, candidateIds
    )
    voting_result["rcv"] = rcv_result_by_tours
    # Condorcet
    condorcet = Condorcet()
    condorcet_res, voters_by_regions = condorcet.calculate(
        voters_by_regions, candidateIds
    )
    voting_result["condorcet"] = {"tour_1": condorcet_res}
    return voting_result, voters_by_regions, win_by_reg_us_like
