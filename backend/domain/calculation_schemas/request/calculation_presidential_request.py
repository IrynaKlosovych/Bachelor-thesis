from typing import List

from domain.calculation_schemas.request.base_calculation_request import (
    BaseCalculationRequest,
)
from domain.candidate_schemas.president_person_candidate import (
    PresidentPersonCandidate,
)


class CalculationPresidentialRequest(BaseCalculationRequest):
    candidates: List[PresidentPersonCandidate]
