export interface Country {
    id: string;

    componentId: `country_${string}`;

    label: string;
    regions: Record<string, Region>;
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