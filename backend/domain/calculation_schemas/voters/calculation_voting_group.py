from typing import Optional

from domain.calculation_schemas.country.country_metrics import CountryMetrics
from domain.calculation_schemas.voters.voter_preferences import VoterPreferences
from domain.region_schemas.types import SafetyLevel
from domain.voter_schemas.voting_group import VotingGroup


class CalculationVotingGroup(VotingGroup):
    safety_region: SafetyLevel
    country_state: CountryMetrics
    preferences: Optional[VoterPreferences] = None
