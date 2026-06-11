import { useResultStore } from "../../store/resultStore";
import type { ElectionMode } from "../../types/country";
import type { UUID } from "../../types/general";
export default function useResultsExists(electionMode: ElectionMode, countryId: UUID) {
    return useResultStore(state =>
        electionMode === "presidential"
            ? !!state.presidential_result[countryId]
            : !!state.parliamentary_results[countryId]
    );
}