from pydantic import BaseModel


class VotingGroupDetails(BaseModel):
    age: str
    sex: str
    nationality: str
    identity: str
    religion: float
    peopleCount: int
    education: str
    economic_status: str
    finance_independent: str
    interest_econ: float
    interest_safety: float
    interest_social: float
    understanding_econ: str
    understanding_safety: str
    understanding_social: str
    political_interest: float
    media_positive_reaction: float
    media_negative_reaction: float
    rating_perception: float
    experience_importance: float
