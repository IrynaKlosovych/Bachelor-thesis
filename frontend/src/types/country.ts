export type UUID = string;
export type CountryComponentId = `country_${UUID}`;
export type RegionsNumber = 1 | 2 | 3 | 4 | 5;
export type RegionKeyName = `region${RegionsNumber}`;
export type RegionComponentId = `country_${UUID}_map_region_${UUID}`;
export type VotingGroupComponentId = `country_${UUID}_group_${UUID}`;
export type StageFilled = "not filled" | "almost" | "ready";
export type GroupFormData = Record<string, Record<string, string>>;


export interface Country {
    id: UUID;
    componentId: CountryComponentId;
    label: string;
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