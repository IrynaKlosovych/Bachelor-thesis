from pydantic import BaseModel

class CandidatesRank(BaseModel):
    score:float
    priority:int