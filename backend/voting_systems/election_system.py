from abc import ABC, abstractmethod
from uuid import UUID

from domain.region_schemas.region import Region
from domain.voter_schemas.calculation_voting_group import CalculationVotingGroup


class ElectionSystem(ABC):
    @abstractmethod
    def calculate(
        self,
        voters_by_regions: dict[UUID, list[CalculationVotingGroup]],
        candidateIds: list[UUID] | dict[str, list[UUID]],
        regions: list[Region] | None = None,
    ):
        pass
