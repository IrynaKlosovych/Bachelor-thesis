from pydantic import BaseModel


class CandidateMedia(BaseModel):
    positive: int = 5
    negative: int = 5