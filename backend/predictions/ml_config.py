from llm.ml_config import COUNTRY_COLS

CAT_COLS = [
    "age",
    "sex",
    "nationality",
    "identity",
    "education",
    "economic_status",
    "finance_independent",
    "understanding_econ",
    "understanding_safety",
    "understanding_social",
]

VOTER_NUM_COLS = [
    "religion",
    "interest_econ",
    "interest_safety",
    "interest_social",
    "safety_region",
    "political_interest",
    "media_positive_reaction",
    "media_negative_reaction",
    "rating_perception",
    "experience_importance",
]
FEATURES = CAT_COLS + VOTER_NUM_COLS + COUNTRY_COLS

TARGET_COLS = [
    "probability_take_part",
    "candidate_positive_importance",
    "candidate_negative_fair_importance",
    "like_easy_decision",
    "like_strong_leader_over_law",
    "understand_government_institutions",
    "every_person_is_expert",
    "person_or_government_importance",
    "believe_government_institutions",
]
VOTER_AXES = TARGET_COLS[1:]
