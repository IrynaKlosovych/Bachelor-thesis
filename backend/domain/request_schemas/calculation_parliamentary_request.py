from domain.candidate_schemas.parliament_candidates import ParliamentCandidates
from domain.request_schemas.base_calculation_request import (
    BaseCalculationRequest,
)


class CalculationParliamentaryRequest(BaseCalculationRequest):
    candidates: ParliamentCandidates
