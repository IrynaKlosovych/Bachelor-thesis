from pydantic import BaseModel


class VotingGroupDetails(BaseModel):
    age: str
    sex: str
    nationality: str
    identity: str
    religion: str
    peopleCount: int
    education: str
    economic_status: str
    finance_independent: str
    interest_econ: str
    interest_safety: str
    interest_social: str
    understanding_econ: str
    understanding_safety: str
    understanding_social: str
    political_interest: str
    media_positive_reaction: str
    media_negative_reaction: str
    rating_perception: str
    experience_importance: str
