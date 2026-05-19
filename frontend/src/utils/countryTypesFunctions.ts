import type { CountryComponentId, PartyCandidateComponentId, PersonCandidateComponentId, RegionComponentId, UUID, VotingGroupComponentId } from "../types/country";
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