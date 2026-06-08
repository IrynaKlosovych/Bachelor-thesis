import type { UUID } from "./general";

export type PersonCandidateComponentId = `country_${UUID}_candidate_${UUID}`;
export type PartyCandidateComponentId = `country_${UUID}_party_${UUID}`;
export type CandidateMedia = {
    positive: number;
    negative: number;
};
export type BasePersonCandidate = {
    id: UUID;
    color: string;
    countryId: UUID;
    componentId: PersonCandidateComponentId;
    name: string;
    experience: string;
    promise: string;
    media: CandidateMedia;
    election_rating: number;
};

export type PresidentPersonCandidate = BasePersonCandidate & {};
export type PartyPersonCandidate = BasePersonCandidate & {
    regionId: UUID;
    partyID: UUID;
};

export type PersonCandidate = PresidentPersonCandidate | PartyPersonCandidate;

export type PartyCandidate = {
    id: UUID;
    color: string;
    countryId: UUID;
    componentId: PartyCandidateComponentId;
    name: string;
    experience: string;
    promise: string;
    media: CandidateMedia;
    election_rating: number;
};