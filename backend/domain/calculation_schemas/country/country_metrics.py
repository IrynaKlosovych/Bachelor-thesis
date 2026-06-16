from pydantic import BaseModel, Field


class CountryMetrics(BaseModel):
    # war_status:
    # 0 = full peace,          10 = active full-scale war
    war_status: float = Field(ge=0, le=10, alias="war_status")
    # economic_crisis:
    # 0 = stable economy,      10 = collapse or hyperinflation
    economic_crisis: float = Field(ge=0, le=10, alias="economic_crisis")
    # corruption_level:
    # 0 = transparent/clean,   10 = systemic corruption
    corruption_level: float = Field(ge=0, le=10, alias="corruption_level")
    # media_freedom:
    # 0 = fully censored,      10 = fully free press
    media_freedom: float = Field(ge=0, le=10, alias="media_freedom")
    # political_stability:
    # 0 = chaos/failed state,  10 = stable democracy
    political_stability: float = Field(ge=0, le=10, alias="political_stability")

    def as_vector(self):
        return [
            self.war_status,
            self.economic_crisis,
            self.corruption_level,
            self.media_freedom,
            self.political_stability,
        ]
