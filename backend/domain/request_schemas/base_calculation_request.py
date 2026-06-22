from typing import List

from pydantic import BaseModel

from domain.country_schemas.country import Country
from domain.region_schemas.region import Region
from domain.voter_schemas.voting_group import VotingGroup


class BaseCalculationRequest(BaseModel):
    country: Country
    regions: List[Region]
    voters: List[VotingGroup]
