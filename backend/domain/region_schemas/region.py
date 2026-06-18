from uuid import UUID

from pydantic import BaseModel

from domain.region_schemas.types import SafetyLevel


class Region(BaseModel):
    id: UUID
    countryId: UUID
    regionKeyName: str
    displayInTable: str
    component_id: str
    safety_level: SafetyLevel
    seats: int
