from typing import Optional
from uuid import UUID

from domain.candidate_schemas.candidates_rank import CandidatesRank
from domain.country_schemas.country_metrics import CountryMetrics
from domain.region_schemas.types import SafetyLevel
from domain.voter_schemas.voter_preferences import VoterPreferences
from domain.voter_schemas.voting_group import VotingGroup


class CalculationVotingGroup(VotingGroup):
    safety_region: SafetyLevel
    country_state: CountryMetrics
    preferences: Optional[VoterPreferences] = None
    president_candidate_similarity: Optional[dict[UUID, CandidatesRank]] = None
    party_candidate_similarity: Optional[dict[UUID, CandidatesRank]] = None
    party_person_candidate_similarity: Optional[dict[UUID, CandidatesRank]] = None
    voting_systems_presidential: Optional[dict[str, dict[str, UUID]]] = None

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
        if self.preferences is None:
            raise RuntimeError("Preferences not initialized")
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

    def set_president_candidates_rank(self, voter_result):
        self.president_candidate_similarity = voter_result

    def set_party_candidates_rank(self, voter_result):
        self.party_candidate_similarity = voter_result

    def set_party_person_candidates_rank(self, voter_result):
        self.party_person_candidate_similarity = voter_result

    def set_voting_systems_presidential(
        self, system: str, winners_by_tours: dict[str, UUID]
    ):
        if not self.voting_systems_presidential:
            self.voting_systems_presidential = {}
        self.voting_systems_presidential[system] = winners_by_tours
