from pydantic import BaseModel, Field
from helpers.normalize import normalize


class CandidateScores(BaseModel):
    # media_positive:
    # 0 = mostly negative coverage,   10 = overwhelmingly positive
    media_positive: float = Field(ge=0, le=10)
    # transparency:
    # 0 = opaque/hides information,   10 = fully transparent
    transparency: float = Field(ge=0, le=10)
    # program_simplicity
    # 0 = complex nuanced policy,     10 = simple slogans only
    program_simplicity: float = Field(ge=0, le=10)
    # leadership_strength
    # 0 = consensus/democratic,       10 = strong authoritarian leader
    leadership_strength: float = Field(ge=0, le=10)
    # institutional_competence
    # 0 = no government experience,  10 = deep institutional expertise
    institutional_competence: float = Field(ge=0, le=10)
    # anti_populism
    # 0 = full populist,              10 = expert-driven, zero populism
    anti_populism: float = Field(ge=0, le=10)
    # social_focus
    # 0 = free market/individual,     10 = social programs/government role
    social_focus: float = Field(ge=0, le=10)
    # rule_of_law
    # 0 = 0 = opposes or distrusts institutions,      10 = strongly supports institutions
    rule_of_law: float = Field(ge=0, le=10)

    def as_vector(self):
        return [
            normalize(self.media_positive, 0, 10),
            normalize(self.transparency, 0, 10),
            normalize(self.program_simplicity, 0, 10),
            normalize(self.leadership_strength, 0, 10),
            normalize(self.institutional_competence, 0, 10),
            normalize(self.anti_populism, 0, 10),
            normalize(self.social_focus, 0, 10),
            normalize(self.rule_of_law, 0, 10),
        ]
