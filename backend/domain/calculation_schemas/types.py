from typing import Dict
from uuid import UUID

from domain.calculation_schemas.candidates.candidate_scores import (
    CandidateScores,
)

CandidateScoresMap = Dict[UUID, CandidateScores]
