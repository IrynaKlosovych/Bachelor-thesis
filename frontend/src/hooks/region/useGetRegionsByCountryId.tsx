import { useRegionStore } from "../../store/regionStore";
import type { UUID } from "../../types/general";

export function useGetRegionsByCountryId(countryId: UUID) {
    const allRegions = useRegionStore(state => state.regions);
    const regionsByCountryId = allRegions.filter(r => r.countryId === countryId);
    return regionsByCountryId;
}