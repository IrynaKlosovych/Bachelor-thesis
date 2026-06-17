from collections import defaultdict
from uuid import UUID

from domain.calculation_schemas.country.country_metrics import CountryMetrics
from domain.calculation_schemas.voters.calculation_voting_group import (
    CalculationVotingGroup,
)
from domain.region_schemas.region import Region
from domain.voter_schemas.voting_group import VotingGroup
from helpers.sort_voters_by_regions import sort_voters_by_regions
from domain.calculation_schemas.candidates.candidates_rank import CandidatesRank

def create_voters_vectors(
    voters: list[VotingGroup], regions: list[Region], country_decr: CountryMetrics
)-> dict[UUID, list[CalculationVotingGroup]]:
    voters_by_region = sort_voters_by_regions(voters)

    voters_by_region_ml = defaultdict(list)
    for region in regions:
        region_voters = voters_by_region.get(region.id, [])

        for voter in region_voters:
            new_voter = CalculationVotingGroup(
                **voter.model_dump(),
                safety_region=region.safety_level,
                country_state=country_decr,
            )
            voters_by_region_ml[region.id].append(new_voter)
    
    return dict(voters_by_region_ml)


def add_priorities(scored:dict[UUID, dict])->dict[UUID, CandidatesRank]:
    items = [(cand_id, data["score"]) for cand_id, data in scored.items()]

    items = sorted(items, key=lambda x: x[1], reverse=True)

    return {
        cand_id: CandidatesRank.model_validate({
            "score": score,
            "priority": rank + 1
        })
        for rank, (cand_id, score) in enumerate(items)
    }
