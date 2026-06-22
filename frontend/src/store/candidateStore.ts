import { create } from "zustand";

import type { PartyCandidate, PartyPersonCandidate, PersonCandidate, PresidentPersonCandidate, TypeActionsRegionsSeats } from "../types/candidate";
import type { UUID } from "../types/general";

interface CandidateStore {
    party_candidates: PartyCandidate[],
    president_person_candidates: PresidentPersonCandidate[];
    party_person_candidates: PartyPersonCandidate[];
    used_president_candidate_hues: Record<UUID, Record<UUID, number>>;
    used_party_candidate_hues: Record<UUID, Record<UUID, number>>;
    used_party_person_regions_seats: Record<UUID, Record<UUID, number>>;

    getPresidentCandidateHues: (countryId: UUID) => Record<UUID, number>;
    getPartyCandidateHues: (countryId: UUID) => Record<UUID, number>;
    addPresidentCandidate: (presidentCandidate: PersonCandidate) => void;
    addPartyCandidate: (party: PartyCandidate) => void;
    addPartyPersonCandidate: (party_person: PartyPersonCandidate) => void;
    updatePresidentCandidateHues: (countryId: UUID, candidate_id: UUID, hue: number) => void;
    updatePartyCandidateHues: (countryId: UUID, candidate_id: UUID, hue: number) => void;
    updatePresidentCandidate: (candidateId: UUID,
        data: Partial<PresidentPersonCandidate>) => void;
    updatePartyCandidate: (candidateId: UUID,
        data: Partial<PartyCandidate>) => void;
    updatePartyPersonCandidate: (candidateId: UUID, data: Partial<PartyPersonCandidate>) => void;
    setUsedPartyPersonRegionsSeats: (regionsId: UUID[], partyId: UUID) => void;
    getUsedPartyPersonRegionsSeats: (partyId: UUID) => Record<UUID, number>;
    updateRegionSeatsAfterChanges: (partyId: UUID, regionId: UUID, type: TypeActionsRegionsSeats) => void;
    updateRegionSeatsCandidate: (partyId: UUID, oldRegionId: UUID, newRegionId: UUID) => void;
    deletePresidentCandidate: (candidateId: UUID) => void;
    deletePartyCandidate: (partyId: UUID) => void;
    deletePartyPersonCandidate: (candidateId: UUID) => void;
    deleteAllPartyPersons: (party_id: UUID) => void;
    deletePresidentCandidateHues: (candidate_id: UUID) => void;
    deletePartyCandidateHues: (candidate_id: UUID) => void;
    deleteRegionSeatsCandidate: (candidate_id: UUID) => void;
    getPresidentsByCountryId: (countryIdToCopy: UUID) => PresidentPersonCandidate[];
    addCopiedPresidentCandidates: (resultPresidents: PresidentPersonCandidate[]) => void;
    addCopiedPresidentHues: (countryId: UUID, presidentHuesToCopy: Record<UUID, number>) => void;
    getPartiesByCountryId: (countryIdToCopy: UUID) => PartyCandidate[];
    addCopiedPartiesCandidates: (resultParties: PartyCandidate[]) => void;
    addCopiedPartiesHues: (country_id: UUID, partyHuesToCopy: Record<UUID, number>) => void;
    getPartyPersonsByCountryId: (countryIdToCopy: UUID) => PartyPersonCandidate[];
    addCopiedPartyPersonCandidates: (resultPartyPersons: PartyPersonCandidate[]) => void;
    getUsedOldPartyPersonRegionsSeats: (arrayOldPartiesId: UUID[]) => Record<UUID, Record<UUID, number>>;
    addCopiedUsedRegionseats: (newUsedPartyPersonRegionsSeats: Record<UUID, Record<UUID, number>>) => void;
    deletePresidentPersonCandidateByCountryId: (countryId: UUID) => void;
    deletePresidentPersonCandidateHuesByCountryId: (countryId: UUID) => void;
    deletePartyCandidateByCountryId: (countryId: UUID) => void;
    deletePartyCandidateHuesByCountryId: (countryId: UUID) => void;
    deletePartyPersonCandidateByCountryId: (countryId: UUID) => void;
    deleteAllPartyRegionSeats: (PartyRegionsSeatsIdsToDelete: UUID[]) => void;
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
            get().used_president_candidate_hues[countryId] ?? {};
        return used;
    },
    getPartyCandidateHues: (countryId: UUID) => {
        const used =
            get().used_party_candidate_hues[countryId] ?? {};
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

    updatePresidentCandidateHues: (countryId, candidate_id, hue) => {
        set((state) => {
            const countryHues =
                state.used_president_candidate_hues[countryId] ?? {};

            return {
                used_president_candidate_hues: {
                    ...state.used_president_candidate_hues,
                    [countryId]: {
                        ...countryHues,
                        [candidate_id]: hue,
                    },
                },
            };
        });
    },

    updatePartyCandidateHues: (countryId, party_id, hue) => {
        set((state) => {
            const countryHues =
                state.used_president_candidate_hues[countryId] ?? {};

            return {
                used_president_candidate_hues: {
                    ...state.used_president_candidate_hues,
                    [countryId]: {
                        ...countryHues,
                        [party_id]: hue,
                    },
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

    updateRegionSeatsAfterChanges: (partyId, regionId, type) => {
        set((state) => {
            const party = state.used_party_person_regions_seats[partyId] || {};
            const current = party[regionId] || 0;
            const result = type === "add" ? current + 1 : current - 1;

            return {
                used_party_person_regions_seats: {
                    ...state.used_party_person_regions_seats,
                    [partyId]: {
                        ...party,
                        [regionId]: result,
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
    },

    deletePresidentCandidate: (candidateId) => {
        set((state) => ({
            president_person_candidates: state.president_person_candidates.filter(
                c => c.id !== candidateId
            ),
        }));
    },

    deletePartyCandidate: (partyId) => {
        set((state) => ({
            party_candidates: state.party_candidates.filter(
                p => p.id !== partyId
            ),
        }));
    },

    deletePartyPersonCandidate: (candidateId) => {
        set((state) => ({
            party_person_candidates: state.party_person_candidates.filter(
                c => c.id !== candidateId
            ),
        }));
    },

    deleteAllPartyPersons: (party_id) => {
        set((state) => ({
            party_person_candidates: state.party_person_candidates.filter(
                c => c.partyID !== party_id
            ),
        }));
    },

    deletePresidentCandidateHues: (candidate_id) => {
        set((state) => {
            const updated = { ...state.used_president_candidate_hues };

            for (const countryId in updated) {
                if (updated[countryId]?.[candidate_id] !== undefined) {
                    const { [candidate_id]: removed, ...rest } =
                        updated[countryId];

                    updated[countryId] = rest;
                    void removed;
                }
            }

            return {
                used_president_candidate_hues: updated,
            };
        });
    },

    deletePartyCandidateHues: (candidate_id) => {
        set((state) => {
            const updated = { ...state.used_party_candidate_hues };

            for (const countryId in updated) {
                if (updated[countryId]?.[candidate_id] !== undefined) {
                    const { [candidate_id]: removed, ...rest } =
                        updated[countryId];
                    void removed;
                    updated[countryId] = rest;
                }
            }

            return {
                used_party_candidate_hues: updated,
            };
        });
    },

    deleteRegionSeatsCandidate: (candidate_id) => {
        set((state) => {
            const { [candidate_id]: removed, ...rest } =
                state.used_party_person_regions_seats;
            void removed;
            return {
                used_party_person_regions_seats: rest,
            };
        });
    },

    getPresidentsByCountryId: (countryIdToCopy: UUID) => {
        const presidents = get().president_person_candidates.filter(p => p.countryId === countryIdToCopy);
        return presidents;
    },

    addCopiedPresidentCandidates: (resultPresidents) => {
        set((state) => {
            return {
                president_person_candidates: [
                    ...state.president_person_candidates,
                    ...resultPresidents
                ],
            };
        });
    },

    addCopiedPresidentHues: (countryId, presidentHuesToCopy) => {
        set((state) => {
            return {
                used_president_candidate_hues: {
                    ...state.used_president_candidate_hues,
                    [countryId]: presidentHuesToCopy
                }
            };
        });
    },

    getPartiesByCountryId: (countryIdToCopy: UUID) => {
        const parties = get().party_candidates.filter(p => p.countryId === countryIdToCopy);
        return parties;
    },

    addCopiedPartiesCandidates: (resultParties) => {
        set((state) => {
            return {
                party_candidates: [
                    ...state.party_candidates,
                    ...resultParties
                ],
            };
        });
    },

    addCopiedPartiesHues: (country_id, partyHuesToCopy) => {
        set((state) => {
            return {
                used_party_candidate_hues: {
                    ...state.used_party_candidate_hues,
                    [country_id]: partyHuesToCopy
                }
            };
        });
    },

    getPartyPersonsByCountryId: (countryIdToCopy: UUID) => {
        const party_persons = get().party_person_candidates.filter(p => p.countryId === countryIdToCopy);
        return party_persons;
    },

    addCopiedPartyPersonCandidates: (resultPartyPersons: PartyPersonCandidate[]) => {
        set((state) => {
            return {
                party_person_candidates: [
                    ...state.party_person_candidates,
                    ...resultPartyPersons
                ],
            };
        });
    },

    getUsedOldPartyPersonRegionsSeats: (arrayOldPartiesId) => {
        const result = Object.fromEntries(
            arrayOldPartiesId.map(id => [
                id,
                get().used_party_person_regions_seats[id]
            ])
        );
        return result;
    },

    addCopiedUsedRegionseats: (newUsedPartyPersonRegionsSeats: Record<UUID, Record<UUID, number>>) => {
        set((state) => ({
            used_party_person_regions_seats: {
                ...state.used_party_person_regions_seats,
                ...newUsedPartyPersonRegionsSeats,
            },
        }));
    },

    deletePresidentPersonCandidateByCountryId: (countryId) => {
        set((state) => ({
            president_person_candidates: state.president_person_candidates.filter(
                c => c.countryId !== countryId
            ),
        }));
    },

    deletePresidentPersonCandidateHuesByCountryId: (countryId) => {
        set((state) => {
            const { [countryId]: removed, ...rest } =
                state.used_president_candidate_hues;
            void removed;
            return {
                used_president_candidate_hues: rest,
            };
        });
    },

    deletePartyCandidateByCountryId: (countryId) => {
        set((state) => ({
            party_candidates: state.party_candidates.filter(
                c => c.countryId !== countryId
            ),
        }));
    },

    deletePartyCandidateHuesByCountryId: (countryId) => {
        set((state) => {
            const { [countryId]: removed, ...rest } =
                state.used_party_candidate_hues;
            void removed;
            return {
                used_party_candidate_hues: rest,
            };
        });
    },

    deletePartyPersonCandidateByCountryId: (countryId) => {
        set((state) => ({
            party_person_candidates: state.party_person_candidates.filter(
                c => c.countryId !== countryId
            ),
        }));
    },

    deleteAllPartyRegionSeats: (PartyRegionsSeatsIdsToDelete) => {
        set((state) => {
            const updated = { ...state.used_party_person_regions_seats };

            for (const partyId of PartyRegionsSeatsIdsToDelete) {
                delete updated[partyId];
            }

            return {
                used_party_person_regions_seats: updated,
            };
        });
    }
}));