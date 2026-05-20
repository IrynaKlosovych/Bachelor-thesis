import type { CountryComponentId, PartyCandidateComponentId, PersonCandidateComponentId, RegionComponentId, StageFilled, UUID, VotingGroup, VotingGroupComponentId } from "../types/country";
import { VOTERS_SETTINGS_TABLE } from "../ui/voters-settings-table";
export const ComponentIdFactory = {
    country: (id: UUID): CountryComponentId =>
        `country_${id}`,

    region: (countryId: UUID, regionId: UUID): RegionComponentId =>
        `country_${countryId}_map_region_${regionId}`,

    group: (countryId: UUID, groupId: UUID): VotingGroupComponentId =>
        `country_${countryId}_group_${groupId}`,

    personCandidate: (countryId: UUID, candidateId: UUID): PersonCandidateComponentId =>
        `country_${countryId}_candidate_${candidateId}`,

    partyCandidate: (countryId: UUID, candidateId: UUID): PartyCandidateComponentId => `country_${countryId}_party_${candidateId}`,
};

export function generateUniqueColor(usedHues: number[]) {
    let hue = Math.floor(Math.random() * 360);

    while (usedHues.includes(hue)) {
        hue = (hue + 25) % 360;
    }

    return {
        hue,
        color: `hsl(${hue}, 70%, 55%)`,
    };
}

export const calculateStageFilled = (
    group: VotingGroup
): StageFilled => {
    const d = group.details_descr;

    const filledCount = VOTERS_SETTINGS_TABLE.filter((field) => {
        const value = d[field.name];

        if (field.name === "peopleCount") {
            return typeof value === "number" && value > 0;
        }

        return value !== "";
    }).length;

    const total = VOTERS_SETTINGS_TABLE.length;

    if (filledCount === total) return "ready";
    if (filledCount >= total / 2) return "almost";
    return "not filled";
};