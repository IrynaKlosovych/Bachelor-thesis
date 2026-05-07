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

export const safetyColors: Record<number, string> = {
    1: "#2ecc71",
    2: "#a3d977",
    3: "#f1c40f",
    4: "#e67e22",
    5: "#e74c3c",
};