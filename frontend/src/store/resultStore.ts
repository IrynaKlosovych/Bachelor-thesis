import { create } from "zustand";

import type { ElectionMode } from "../types/country";
import type { UUID } from "../types/general";
import type { ParliamentaryResult,PresidentialResult } from "../types/results";

interface ResultStore {
    presidential_result: Record<UUID, PresidentialResult>,
    parliamentary_results: Record<UUID, ParliamentaryResult>;
    setResults: <T extends keyof ElectionResultsMap>(
        countryId: UUID,
        electionMode: T,
        results: ElectionResultsMap[T]
    ) => void;
    getResults: (countryId: UUID, electionMode: ElectionMode) => PresidentialResult | ParliamentaryResult;
}
type ElectionResultsMap = {
    presidential: PresidentialResult;
    parliamentary: ParliamentaryResult;
};
export const useResultStore = create<ResultStore>((set, get) => ({
    presidential_result: {},
    parliamentary_results: {},

    setResults: (countryId, electionMode, results) => {
        set((state) => {
            if (electionMode === "presidential") {
                return {
                    presidential_result: {
                        ...state.presidential_result,
                        [countryId]: results
                    }
                };
            }
            return {
                parliamentary_results: {
                    ...state.parliamentary_results,
                    [countryId]: results
                }
            };
        });
    },

    getResults: (countryId, electionMode) => {
        if (electionMode === "parliamentary") {
            return get().parliamentary_results[countryId];
        }
        return get().presidential_result[countryId];
    }
}));