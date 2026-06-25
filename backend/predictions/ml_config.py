from pathlib import Path

from llm.ml_config import COUNTRY_COLS

ML_MODELS_DIR = Path(__file__).resolve().parent / "models"
RESIDUAL_STATS_PATH = ML_MODELS_DIR / "residual_stats.json"
CALIBRATION_STATS_PATH = ML_MODELS_DIR / "calibration_stats.json"

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

Y_COLS = [
    "understand_government_institutions",
    "believe_government_institutions",
    "every_person_is_expert",
    "probability_take_part",
    "candidate_positive_importance",
    "candidate_negative_fair_importance",
    "like_easy_decision",
    "like_strong_leader_over_law",
    "person_or_government_importance",
]
DROP_NON_FEATURE = Y_COLS + ["voter_id", "snapshot_id", "base_voter_id", "source"]

ENABLE_VOTER_SAMPLING = True
ENABLE_REAL_CALIBRATION = True
DEMOGRAPHIC_WEIGHT = 0.3

AXIS_RANGES = [
    (0.0, 10.0),  # candidate_positive_importance / media_positive
    (0.0, 10.0),  # candidate_negative_fair_importance / transparency
    (0.0, 10.0),  # (10 - like_easy_decision) / program_simplicity
    (1.0, 5.0),   # like_strong_leader_over_law / leadership_strength
    (0.0, 10.0),  # understand_government_institutions / institutional_competence
    (1.0, 5.0),   # (6 - every_person_is_expert) / anti_populism
    (0.0, 10.0),  # person_or_government_importance / social_focus
    (0.0, 10.0),  # believe_government_institutions / rule_of_law
]