export type UUID = string;
export type CountryComponentId = `country_${UUID}`;
export type RegionsNumber = 1 | 2 | 3 | 4 | 5;
export type RegionKeyName = `region${RegionsNumber}`;
export type RegionComponentId = `country_${UUID}_map_region_${UUID}`;
export type VotingGroupComponentId = `country_${UUID}_group_${UUID}`;
export type StageFilled = "not filled" | "almost" | "ready";
export type GroupFormData = Record<string, Record<string, string>>;
export type OpenPopupData = { voter: VotingGroup; };
export type ElectionMode = "presidential" | "parliamentary";
export type MapMode = "edit" | "view"; //?
export type PersonCandidateComponentId = `country_${UUID}_candidate_${UUID}`;
export type PartyCandidateComponentId = `country_${UUID}_party_${UUID}`;
export type CandidateMedia = {
    positive: number;
    negative: number;
};

export interface Country {
    id: UUID;
    componentId: CountryComponentId;
    label: string;
    electionMode: ElectionMode;
    descr: string;
}

export type SafetyLevel = 1 | 2 | 3 | 4 | 5;
export const SAFETY_LEVELS: SafetyLevel[] = [1, 2, 3, 4, 5,];
export interface Region {
    id: UUID;
    countryId: UUID;
    regionKeyName: RegionKeyName;
    displayInTable: string,
    component_id: RegionComponentId;
    safety_level: SafetyLevel;
}

export type VotingGroup = {
    id: UUID;
    countryId: UUID;
    regionId: UUID;
    componentId: VotingGroupComponentId;
    name: string;
    peopleCount: number;
    details_descr: {
        age: string,
        sex: string,
        nationality: string,
    },
    stageFilled: StageFilled;
    // SVG coords
    x: number;
    y: number;
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
};