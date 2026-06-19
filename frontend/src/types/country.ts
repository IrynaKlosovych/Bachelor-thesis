import type { UUID } from "./general";

export type CountryComponentId = `country_${UUID}`;
export type ElectionMode = "presidential" | "parliamentary";

export interface Country {
    id: UUID;
    componentId: CountryComponentId;
    label: string;
    electionMode: ElectionMode;
    descr: string;
    totalSeats: number;
}
export interface CountryResult {
    id: UUID;
    componentId: CountryComponentId;
    label: string;
}