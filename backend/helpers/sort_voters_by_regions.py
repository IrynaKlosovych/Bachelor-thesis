from collections import defaultdict
from uuid import UUID

from domain.voter_schemas.voting_group import VotingGroup


def sort_voters_by_regions(voters: list[VotingGroup]) -> dict[UUID, list[VotingGroup]]:
    voters_by_region = defaultdict(list)

    for voter in voters:
        voters_by_region[voter.regionId].append(voter)

    return dict(voters_by_region)
