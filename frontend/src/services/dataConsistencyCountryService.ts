import { copyCountry, createCountry } from "../factories/country/countryFactory";
import { copyRegions, createRegions } from "../factories/region/regionsFactory";
import { useCountryStore } from "../store/countryStore";
import { useRegionStore } from "../store/regionStore";
import { useVoterStore } from "../store/voterStore";
import type { UUID } from "../types/general";

export function addCountryService() {
    const countryNumber = useCountryStore.getState().getCountryNumForName();
    const country = createCountry(countryNumber);
    useCountryStore.getState().addCountry(country);
    useCountryStore.getState().incrementCountryNumForName();

    const regions = createRegions(country.id);
    useRegionStore.getState().addRegionsToCountry(regions);

    useVoterStore.getState().setVotingGroupCounter(country.id, 0);
    // active visible country
}

export function copyCountryService(countryIdToCopy: UUID) {
    const countryToCopy = useCountryStore.getState().getCountryById(countryIdToCopy);
    if (!countryToCopy) return;
    const res_country = copyCountry(countryToCopy);
    useCountryStore.getState().incrementCountryNumForName();
    useCountryStore.getState().copyCountry(res_country);

    const regionsToCopy = useRegionStore.getState().getRegionsByCountryId(countryIdToCopy);
    const newRegions = copyRegions(regionsToCopy, res_country.id);
    useRegionStore.getState().copyCountryRegions(newRegions);


    // voters
    // president candidate
    // party candidate
    // party person candidate
    // active visible country
}

export function deleteCountryService(countryId: UUID) {
    useCountryStore.getState().deleteCountry(countryId);

    useRegionStore.getState().deleteCountryRegions(countryId);

    useVoterStore.getState().deleteCountryGroups(countryId);
    useVoterStore.getState().deleteGroupsCounterbyCountryId(countryId);

    // president candidate
    // party candidate
    // party person candidate
    // active visible country
}