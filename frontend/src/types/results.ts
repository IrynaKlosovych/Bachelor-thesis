import { ELECTION_VOTING_SYSTEMS_VISIBLE } from "../ui/result-messages";

import type { CountryResult } from "./country";
// import type { RegionResult } from "./region";

export type VotingSystemId = keyof typeof ELECTION_VOTING_SYSTEMS_VISIBLE;
export interface VotingSystem {
    id: VotingSystemId;
}
export interface PresidentialResult {
    country: CountryResult;
    // voters: [];
    // president_candidates: [],
    voting_systems: VotingSystem[];
}

export interface ParliamentaryResult {
    country: CountryResult;
    // voters: [];
    // party_candidates: [];
    // party_person_candidates: [],
    voting_systems: VotingSystem[];
}