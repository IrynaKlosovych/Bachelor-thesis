import type { CountryComponentId, RegionComponentId, UUID, VotingGroupComponentId } from "../types/country";
export const ComponentIdFactory = {
    country: (id: UUID): CountryComponentId =>
        `country_${id}`,

    region: (countryId: UUID, regionId: UUID): RegionComponentId =>
        `country_${countryId}_map_region_${regionId}`,

    group: (countryId: UUID, groupId: UUID): VotingGroupComponentId =>
        `country_${countryId}_group_${groupId}`,
};