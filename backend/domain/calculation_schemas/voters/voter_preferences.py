from pydantic import BaseModel


class VoterPreferences(BaseModel):
    probability_take_part: float
    candidate_positive_importance: float
    candidate_negative_fair_importance: float
    like_easy_decision: float
    like_strong_leader_over_law: float
    understand_government_institutions: float
    every_person_is_expert: float
    person_or_government_importance: float
    believe_government_institutions: float
