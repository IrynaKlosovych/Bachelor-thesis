from domain.calculation_schemas.request.base_calculation_request import (
    BaseCalculationRequest,
)
from domain.candidate_schemas.parliament_candidates import ParliamentCandidates


class CalculationParliamentaryRequest(BaseCalculationRequest):
    candidates: ParliamentCandidates
