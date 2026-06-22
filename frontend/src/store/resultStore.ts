import { create } from "zustand";

import type { UUID } from "../types/general";
import type { ParliamentaryResult, PresidentialResult } from "../types/results";

interface ResultStore {
    presidential_result: Record<UUID, PresidentialResult>,
    parliamentary_results: Record<UUID, ParliamentaryResult>;
    setResults: <T extends keyof ElectionResultsMap>(
        countryId: UUID,
        electionMode: T,
        results: ElectionResultsMap[T]
    ) => void;
    getPresidentialResults: (
        countryId: UUID
    ) => PresidentialResult;
    getParliamentaryResults: (
        countryId: UUID
    ) => ParliamentaryResult;
    deleteResults: <T extends keyof ElectionResultsMap>(
        countryId: UUID,
        electionMode: T) => void;
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
                        [countryId]: results as PresidentialResult
                    }
                };
            }
            return {
                parliamentary_results: {
                    ...state.parliamentary_results,
                    [countryId]: results as ParliamentaryResult
                }
            };
        });
    },

    getPresidentialResults: (countryId
    ) => {
        return get().presidential_result[countryId];
    },

    getParliamentaryResults: (countryId) => {
        return get().parliamentary_results[countryId];
    },

    deleteResults: (countryId, electionMode) => {
        set((state) => {
            if (electionMode === "presidential") {
                return {
                    presidential_result: Object.fromEntries(
                        Object.entries(state.presidential_result)
                            .filter(([id]) => id !== countryId)
                    ),
                };
            }

            return {
                parliamentary_results: Object.fromEntries(
                    Object.entries(state.parliamentary_results)
                        .filter(([id]) => id !== countryId)
                ),
            };
        });
    }
}));