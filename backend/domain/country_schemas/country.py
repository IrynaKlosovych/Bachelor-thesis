from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from domain.country_schemas.country_metrics import CountryMetrics
from domain.country_schemas.types import ElectionMode


class Country(BaseModel):
    id: UUID
    componentId: str
    label: str
    electionMode: ElectionMode
    descr: str
    totalSeats: int
    countryMetrics: Optional[CountryMetrics]= None
