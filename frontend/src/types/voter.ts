import type { UUID } from "./general";

export type VotingGroupComponentId = `country_${UUID}_group_${UUID}`;
export type StageFilled = "not filled" | "almost" | "ready";
export type OpenPopupData = { voter: VotingGroup; };

export type VotingGroup = {
    id: UUID;
    countryId: UUID;
    regionId: UUID;
    componentId: VotingGroupComponentId;
    name: string;
    details_descr: {
        age: string,
        sex: string,
        nationality: string,
        identity: string,
        religion: string,
        peopleCount: number,
    },
    stageFilled: StageFilled;
    // SVG coords
    x: number;
    y: number;
};

export type VotingGroupField = keyof VotingGroup["details_descr"];

export type VoterSettingField = {
    name: VotingGroupField;
    display_name: string;
    default_message?: string;
    possible_variants?: Record<string, string>;
    type?: string;
};