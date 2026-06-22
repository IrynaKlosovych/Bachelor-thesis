import { useCountryStore } from "../../store/countryStore";
import type { UUID } from "../../types/general";

export function useGetCountryById(countryId: UUID) {
    const countries = useCountryStore(state => state.countries);
    const country = countries.find(c => c.id === countryId);
    return country;
}