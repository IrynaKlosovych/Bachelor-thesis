export interface Country {
    id: string;
    componentId: `country_${string}`;
    label: string;
}

export type SafetyLevel = 1 | 2 | 3 | 4 | 5;
export const SAFETY_LEVELS: SafetyLevel[] = [
    1,
    2,
    3,
    4,
    5,
];
export interface Region {
    id: string;
    countryId: string;
    regionKeyName: string;
    d: string;
    component_id: `country_${string}_map_region_${string}`;
    safety_level: SafetyLevel;
}

export const safetyColors: Record<SafetyLevel, string> = {
    1: "var(--pink-lemonade)",
    2: "var(--mango-mojito)",
    3: "var(--blazing-yellow)",
    4: "var(--shifting-sand)",
    5: "var(--almost-aqua)",
};

export type VotingGroup = {
    id: string;
    countryId: string;
    regionId: string;
    componentId:`country_${string}_group_${string}`;
    name: string;
    peopleCount: number;
    // SVG coords
    x: number;
    y: number;
};