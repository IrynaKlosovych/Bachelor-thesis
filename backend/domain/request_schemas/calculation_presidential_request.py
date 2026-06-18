from typing import List

from domain.candidate_schemas.president_person_candidate import (
    PresidentPersonCandidate,
)
from domain.request_schemas.base_calculation_request import (
    BaseCalculationRequest,
)


class CalculationPresidentialRequest(BaseCalculationRequest):
    candidates: List[PresidentPersonCandidate]
