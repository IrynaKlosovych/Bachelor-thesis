from uuid import UUID

from domain.region_schemas.region import Region
from domain.voter_schemas.calculation_voting_group import CalculationVotingGroup
from voting_systems.election_system import ElectionSystem


class TRS(ElectionSystem):
    def calculate(self, voters_by_regions: dict[UUID, list[CalculationVotingGroup]], candidateIds: list[UUID] | dict[str, list[UUID]], regions: list[Region] | None = None):
        return super().calculate(voters_by_regions, candidateIds, regions)
