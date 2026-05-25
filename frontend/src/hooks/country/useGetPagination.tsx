import { useCountryStore } from "../../store/countryStore";

export function useGetPagination(): { resIndex: number; length: number; } {
    const length = useCountryStore(state => state.countries.length);
    const activeId = useCountryStore(state => state.activeCountryId);

    const index = useCountryStore(state => {
        if (!activeId) return -1;
        return state.getCountryIndexById(activeId);
    });

    return {
        resIndex: index >= 0 ? index + 1 : 0,
        length,
    };
}