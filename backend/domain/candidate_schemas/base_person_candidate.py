from uuid import UUID

from pydantic import BaseModel

from domain.candidate_schemas.candidate_media import CandidateMedia


class BasePersonCandidate(BaseModel):
    id: UUID
    color: str
    countryId: UUID
    componentId: str
    name: str = "Unknown"
    experience: str = "Not provided"
    promise: str = "Not provided"
    media: CandidateMedia = CandidateMedia()
    election_rating: float = 0
