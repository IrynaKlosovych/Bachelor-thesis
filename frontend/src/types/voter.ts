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
        education: string,
        economic_status: string,
        finance_independent: string,
        interest_econ: string,
        interest_safety: string,
        interest_social: string,
        understanding_econ: string,
        understanding_safety: string,
        understanding_social: string,
        political_interest: string,
        media_positive_reaction: string,
        media_negative_reaction: string,
        rating_perception: string,
        experience_importance: string;
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