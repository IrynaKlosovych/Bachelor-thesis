from uuid import UUID

from domain.region_schemas.region import Region
from domain.voter_schemas.calculation_voting_group import CalculationVotingGroup
from voting_systems.majoritarian.fptp import FPTP
from voting_systems.majoritarian.trs import TRS


def presidential_result(
    voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
    candidateIds: list[UUID],
    regions: list[Region],
) -> tuple[
    dict[str, dict[str, dict[UUID, float]]], dict[UUID, list[CalculationVotingGroup]]
]:
    voting_result: dict[str, dict[str, dict[UUID, float]]] = {}
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

    # RCV

    # Condorcet

    return voting_result, voters_by_regions
