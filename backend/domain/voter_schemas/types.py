from typing import Literal

StageFilled = Literal["not filled", "almost", "ready"]

VotingGroupField = Literal[
    "age",
    "sex",
    "nationality",
    "identity",
    "religion",
    "peopleCount",
    "education",
    "economic_status",
    "finance_independent",
    "interest_econ",
    "interest_safety",
    "interest_social",
    "understanding_econ",
    "understanding_safety",
    "understanding_social",
    "political_interest",
    "media_positive_reaction",
    "media_negative_reaction",
    "rating_perception",
    "experience_importance",
]