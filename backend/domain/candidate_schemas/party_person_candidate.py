from uuid import UUID

from domain.candidate_schemas.base_person_candidate import BasePersonCandidate


class PartyPersonCandidate(BasePersonCandidate):
    regionId: UUID
    partyID: UUID
