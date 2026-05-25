import { useRegionStore } from "../../store/regionStore";
import type { UUID } from "../../types/general";

export function useGetRegionById(regionId: UUID) {
    const allRegions = useRegionStore(state => state.regions);
    const regionById = allRegions.find(r => r.id === regionId);
    return regionById;
}