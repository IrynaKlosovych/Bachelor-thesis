from typing import List

from pydantic import BaseModel

from domain.candidate_schemas.party_candidate import PartyCandidate
from domain.candidate_schemas.party_person_candidate import PartyPersonCandidate


class ParliamentCandidates(BaseModel):
    parties: List[PartyCandidate]
    persons: List[PartyPersonCandidate]
