from uuid import UUID

from domain.voter_schemas.calculation_voting_group import CalculationVotingGroup


def to_json_safe(obj):
    if isinstance(obj, dict):
        return {str(k): to_json_safe(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [to_json_safe(v) for v in obj]
    if isinstance(obj, UUID):
        return str(obj)
    if isinstance(obj, CalculationVotingGroup):
        return {
            "id": obj.id,
            "countryId": obj.countryId,
            "regionId": obj.regionId,
            "componentId": obj.componentId,
            "name": obj.name,
            "x": obj.x,
            "y": obj.y,
            "probability_take_part": obj.preferences.probability_take_part
            if obj.preferences
            else None,
            "voting_systems_presidential": obj.voting_systems_presidential,
        }
    return obj
