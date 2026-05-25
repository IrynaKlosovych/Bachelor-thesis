import { create } from "zustand";

import type { PartyCandidate, PartyPersonCandidate, PersonCandidate, PresidentPersonCandidate } from "../types/candidate";
import type { UUID } from "../types/general";

interface CandidateStore {
    party_candidates: PartyCandidate[],
    president_person_candidates: PresidentPersonCandidate[];
    party_person_candidates: PartyPersonCandidate[];
    used_president_candidate_hues: Record<UUID, number[]>;
    used_party_candidate_hues: Record<UUID, number[]>;

    getPresidentCandidateHues: (countryId: UUID) => number[];
    addPresidentCandidate: (presidentCandidate: PersonCandidate) => void;
    updatePresidentCandidateHues: (countryId: UUID, used: number[], hue: number) => void;
    updatePresidentCandidate: (candidateId: UUID,
        data: Partial<PresidentPersonCandidate>) => void;
}

export const useCandidateStore = create<CandidateStore>((set, get) => ({
    party_candidates: [],
    president_person_candidates: [],
    party_person_candidates: [],
    used_president_candidate_hues: {},
    used_party_candidate_hues: {},

    getPresidentCandidateHues: (countryId) => {
        const used =
            get().used_president_candidate_hues[countryId] ?? [];
        return used;
    },

    addPresidentCandidate: (presidentCandidate) => {
        set((state) => {
            return {
                president_person_candidates: [
                    ...state.president_person_candidates,
                    presidentCandidate
                ],
            };
        });
    },

    updatePresidentCandidateHues: (countryId, used, hue) => {
        set((state) => {
            return {
                used_president_candidate_hues: {
                    ...state.used_president_candidate_hues,
                    [countryId]: [...used, hue],
                },
            };
        });
    },

    updatePresidentCandidate: (candidateId, data) => {
        set((state) => ({
            president_person_candidates:
                state.president_person_candidates.map((candidate) =>
                    candidate.id === candidateId
                        ? {
                            ...candidate,
                            ...data,
                        }
                        : candidate
                ),
        }));
    },
}));