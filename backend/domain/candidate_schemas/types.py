from typing import Dict, Union
from uuid import UUID

from domain.candidate_schemas.candidate_scores import CandidateScores
from domain.candidate_schemas.party_candidate import PartyCandidate
from domain.candidate_schemas.party_person_candidate import PartyPersonCandidate
from domain.candidate_schemas.president_person_candidate import (
    PresidentPersonCandidate,
)

PersonCandidate = Union[PresidentPersonCandidate, PartyPersonCandidate]
GeneralCandidate = Union[PersonCandidate, PartyCandidate]
CandidateScoresMap = Dict[UUID, CandidateScores]
