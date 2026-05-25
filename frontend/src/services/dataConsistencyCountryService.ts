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

    useCountryStore.getState().setActiveCountry(country.id);
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

    useCountryStore.getState().setActiveCountry(res_country.id);
}

export function deleteCountryService(countryId: UUID) {
    const index = useCountryStore.getState().getCountryIndexById(countryId);
    useCountryStore.getState().deleteCountry(countryId);
    useCountryStore.getState().changeActiveCountryAfterDelete(index);

    useRegionStore.getState().deleteCountryRegions(countryId);

    useVoterStore.getState().deleteCountryGroups(countryId);
    useVoterStore.getState().deleteGroupsCounterbyCountryId(countryId);

    // president candidate
    // party candidate
    // party person candidate
}

export function prevCountryService() {
    useCountryStore.getState().prevCountry();
}
export function nextCountryService() {
    useCountryStore.getState().nextCountry();
}