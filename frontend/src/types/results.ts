import { ELECTION_VOTING_SYSTEMS_VISIBLE } from "../ui/result-messages";

import type { UUID } from "./general";
export type VotingSystemId = keyof typeof ELECTION_VOTING_SYSTEMS_VISIBLE;
export interface PresidentialVotingSystems {
    fptp: Record<string, Record<UUID, number>>;
    trs: Record<string, Record<UUID, number>>;
    us_like: Record<string, Record<UUID, number>>;
    rcv: Record<string, Record<UUID, number>>;
    condorcet: Record<
        string,
        Record<
            UUID,
            Record<
                UUID,
                {
                    expression: string;
                    result: "win" | "loss" | "same";
                }
            >
        >
    >;
}
export interface ParliamentaryVotingSystems {
    pr: Record<UUID, number>;
    ps: Record<UUID, number>;
    mmp: Record<UUID, number>;
}
export interface VoterPresidentialResult {
    id: UUID,
    countryId: UUID;
    regionId: UUID,
    componentId: string,
    name: string;
    "x": number,
    "y": number,
    probability_take_part: number,
    president_candidate_similarity: Record<UUID, Record<string, number>>;
    voting_systems_presidential: Record<string, Record<string, UUID>>;
}
export interface PresidentialResult {
    countryId: UUID;
    voters_by_regions: Record<UUID, VoterPresidentialResult[]>;
    voting_systems: PresidentialVotingSystems;
}

export interface ParliamentaryResult {
    countryId: UUID;
    voters_by_regions: unknown;
    voting_systems: ParliamentaryVotingSystems;
}