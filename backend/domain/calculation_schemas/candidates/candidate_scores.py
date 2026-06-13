from pydantic import BaseModel, Field


class CandidateScores(BaseModel):
    media_positive: float = Field(ge=0, le=10)
    transparency: float = Field(ge=0, le=10)
    program_simplicity: float = Field(ge=0, le=10)
    leadership_strength: float = Field(ge=1, le=5)
    institutional_competence: float = Field(ge=0, le=10)
    anti_populism: float = Field(ge=0, le=10)
    social_focus: float = Field(ge=0, le=10)
    rule_of_law: float = Field(ge=0, le=10)

    def as_vector(self):
        return [
            self.media_positive,
            self.transparency,
            self.program_simplicity,
            self.leadership_strength,
            self.institutional_competence,
            self.anti_populism,
            self.social_focus,
            self.rule_of_law,
        ]
