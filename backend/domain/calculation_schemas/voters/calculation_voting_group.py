from typing import Optional

from domain.calculation_schemas.country.country_metrics import CountryMetrics
from domain.calculation_schemas.voters.voter_preferences import VoterPreferences
from domain.region_schemas.types import SafetyLevel
from domain.voter_schemas.voting_group import VotingGroup


class CalculationVotingGroup(VotingGroup):
    safety_region: SafetyLevel
    country_state: CountryMetrics
    preferences: Optional[VoterPreferences] = None

    def voter_to_ml_row(self):
        details = self.details_descr.model_dump()

        details.pop("peopleCount", None)
        row = {
            **details,
            "safety_region": self.safety_region,
            **self.country_state.model_dump(),
        }

        return row

    def update_preferences(self, voter_result):
        self.preferences = VoterPreferences(
            understand_government_institutions=voter_result[0],
            believe_government_institutions=voter_result[1],
            every_person_is_expert=voter_result[2],
            probability_take_part=voter_result[3],
            candidate_positive_importance=voter_result[4],
            candidate_negative_fair_importance=voter_result[5],
            like_easy_decision=voter_result[6],
            like_strong_leader_over_law=voter_result[7],
            person_or_government_importance=voter_result[8],
        )

    def get_ideal_vector(self):
        return [
            self.preferences.candidate_positive_importance,
            self.preferences.candidate_negative_fair_importance,
            10 - self.preferences.like_easy_decision,
            self.preferences.like_strong_leader_over_law,
            self.preferences.understand_government_institutions,
            5 - self.preferences.every_person_is_expert,
            self.preferences.person_or_government_importance,
            self.preferences.believe_government_institutions,
        ]
