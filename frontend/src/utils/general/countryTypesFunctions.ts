import type { PartyCandidateComponentId, PersonCandidateComponentId } from "../../types/candidate";
import type { CountryComponentId } from "../../types/country";
import type { UUID } from "../../types/general";
import type { RegionComponentId } from "../../types/region";
import type { VotingGroupComponentId } from "../../types/voter";

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