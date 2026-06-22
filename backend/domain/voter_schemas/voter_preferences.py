from pydantic import BaseModel, Field


class VoterPreferences(BaseModel):
    # probability_take_part:
    # 0 = no take part,   100 = important take part
    probability_take_part: float = Field(ge=0, le=100)
    # candidate_positive_importance:
    # 0 = not important,   10 = very important
    candidate_positive_importance: float = Field(ge=0, le=10)
    # candidate_negative_fair_importance:
    # 0 = not important,   10 = very important
    candidate_negative_fair_importance: float = Field(ge=0, le=10)
    # like_easy_decision:
    # 0 = easy,   10 = hard
    # INVERT
    like_easy_decision: float = Field(ge=0, le=10)
    # like_strong_leader_over_law:
    # 1 = democratic,   5 = authorataraian
    like_strong_leader_over_law: float = Field(ge=1, le=5)
    # understand_government_institutions:
    # 0 = no understanding,   10 = well understanding
    understand_government_institutions: float = Field(ge=0, le=10)
    # every_person_is_expert:
    # 1 = not agree, need expert,   5 = agree, everyone is expert
    # INVERT
    every_person_is_expert: float = Field(ge=1, le=5)
    # person_or_government_importance:
    # 0 = personal,   10 = national
    person_or_government_importance: float = Field(ge=0, le=10)
    # believe_government_institutions:
    # 0 = not believe,   10 = believe
    believe_government_institutions: float = Field(ge=0, le=10)
