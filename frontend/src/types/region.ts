import type { UUID } from "./general";

export type RegionsNumber = 1 | 2 | 3 | 4 | 5;
export type RegionKeyName = `region${RegionsNumber}`;
export type RegionComponentId = `country_${UUID}_map_region_${UUID}`;
export type RegionSeats = {
    regionId: UUID,
    population: number;
};
export type SafetyLevel = 1 | 2 | 3 | 4 | 5;
export const SAFETY_LEVELS: SafetyLevel[] = [1, 2, 3, 4, 5,];
export interface Region {
    id: UUID;
    countryId: UUID;
    regionKeyName: RegionKeyName;
    displayInTable: string,
    component_id: RegionComponentId;
    safety_level: SafetyLevel;
    seats: number;
}

export interface RegionResult{
    id: UUID;
    countryId: UUID;
    regionKeyName: RegionKeyName;
    displayInTable: string,
    component_id: RegionComponentId;
}