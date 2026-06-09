import { create } from "zustand";

import type { PartyCandidate, PartyPersonCandidate, PersonCandidate, PresidentPersonCandidate } from "../types/candidate";
import type { UUID } from "../types/general";

interface CandidateStore {
    party_candidates: PartyCandidate[],
    president_person_candidates: PresidentPersonCandidate[];
    party_person_candidates: PartyPersonCandidate[];
    used_president_candidate_hues: Record<UUID, number[]>;
    used_party_candidate_hues: Record<UUID, number[]>;
    used_party_person_regions_seats: Record<UUID, Record<UUID, number>>;

    getPresidentCandidateHues: (countryId: UUID) => number[]; getPartyCandidateHues: (countryId: UUID) => number[];
    addPresidentCandidate: (presidentCandidate: PersonCandidate) => void;
    addPartyCandidate: (party: PartyCandidate) => void;
    addPartyPersonCandidate: (party_person: PartyPersonCandidate) => void;
    updatePresidentCandidateHues: (countryId: UUID, used: number[], hue: number) => void;
    updatePartyCandidateHues: (countryId: UUID, usedColors: number[], hue: number) => void;
    updatePresidentCandidate: (candidateId: UUID,
        data: Partial<PresidentPersonCandidate>) => void;
    updatePartyCandidate: (candidateId: UUID,
        data: Partial<PartyCandidate>) => void;
    updatePartyPersonCandidate: (candidateId: UUID, data: Partial<PartyPersonCandidate>) => void;
    setUsedPartyPersonRegionsSeats: (regionsId: UUID[], partyId: UUID) => void;
    getUsedPartyPersonRegionsSeats: (partyId: UUID) => Record<UUID, number>;
    updateRegionSeatsAfterAddingPerson: (partyId: UUID, regionId: UUID) => void;
    updateRegionSeatsCandidate: (partyId: UUID, oldRegionId: UUID, newRegionId: UUID) => void;
}

export const useCandidateStore = create<CandidateStore>((set, get) => ({
    party_candidates: [],
    president_person_candidates: [],
    party_person_candidates: [],
    used_president_candidate_hues: {},
    used_party_candidate_hues: {},
    used_party_person_regions_seats: {},


    getPresidentCandidateHues: (countryId) => {
        const used =
            get().used_president_candidate_hues[countryId] ?? [];
        return used;
    },
    getPartyCandidateHues: (countryId: UUID) => {
        const used =
            get().used_party_candidate_hues[countryId] ?? [];
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

    addPartyCandidate: (party) => {
        set((state) => {
            return {
                party_candidates: [
                    ...state.party_candidates, party
                ]
            };
        });
    },

    addPartyPersonCandidate: (party_person) => {
        set((state) => {
            return {
                party_person_candidates: [
                    ...state.party_person_candidates, party_person
                ]
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

    updatePartyCandidateHues: (countryId, usedColors, hue) => {
        set((state) => {
            return {
                used_party_candidate_hues: {
                    ...state.used_party_candidate_hues,
                    [countryId]: [...usedColors, hue]
                }
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

    updatePartyCandidate: (candidateId, data) => {
        set((state) => ({
            party_candidates:
                state.party_candidates.map((candidate) =>
                    candidate.id === candidateId
                        ? {
                            ...candidate,
                            ...data,
                        }
                        : candidate
                ),
        }));
    },

    updatePartyPersonCandidate: (candidateId, data) => {
        set((state) => ({
            party_person_candidates:
                state.party_person_candidates.map((candidate) => candidate.id === candidateId ? {
                    ...candidate,
                    ...data
                } : candidate)
        }));
    },

    setUsedPartyPersonRegionsSeats: (regionsId, partyId) => {
        set((state) => {
            const emptyRegions = Object.fromEntries(
                regionsId.map((regionId) => [regionId, 0])
            );

            return {
                used_party_person_regions_seats: {
                    ...state.used_party_person_regions_seats,
                    [partyId]: emptyRegions,
                },
            };
        });
    },

    getUsedPartyPersonRegionsSeats: (partyId) => {
        return get().used_party_person_regions_seats[partyId];
    },

    updateRegionSeatsAfterAddingPerson: (partyId, regionId) => {
        set((state) => {
            const party = state.used_party_person_regions_seats[partyId] || {};
            const current = party[regionId] || 0;

            return {
                used_party_person_regions_seats: {
                    ...state.used_party_person_regions_seats,
                    [partyId]: {
                        ...party,
                        [regionId]: current + 1,
                    },
                },
            };
        });
    },

    updateRegionSeatsCandidate: (partyId, oldRegionId, newRegionId) => {
        set((state) => {
            const party = state.used_party_person_regions_seats[partyId] || {};

            const oldCount = party[oldRegionId] || 0;
            const newCount = party[newRegionId] || 0;

            const result = { ...party };

            if (oldRegionId === newRegionId) {
                return state;
            }

            result[oldRegionId] = Math.max(0, oldCount - 1);
            result[newRegionId] = newCount + 1;

            return {
                used_party_person_regions_seats: {
                    ...state.used_party_person_regions_seats,
                    [partyId]: result,
                },
            };
        });
    }
}));