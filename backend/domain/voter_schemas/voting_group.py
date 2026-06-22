from uuid import UUID

from pydantic import BaseModel

from domain.voter_schemas.types import StageFilled
from domain.voter_schemas.voting_group_details import VotingGroupDetails


class VotingGroup(BaseModel):
    id: UUID
    countryId: UUID
    regionId: UUID
    componentId: str
    name: str
    details_descr: VotingGroupDetails
    stageFilled: StageFilled
    x: float
    y: float
