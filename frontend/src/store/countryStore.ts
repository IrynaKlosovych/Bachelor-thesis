import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

import { CANDIDATE_SETTINGS, DEFAULT_VOTING_GROUP_SETTING, ELECTION_MODE_SETTINGS, REGION_SEATS, REGIONS_SETTINGS } from "../constants/constants";
import type { Country, ElectionMode, PartyCandidate, PartyPersonCandidate, PresidentPersonCandidate, Region, RegionKeyName, RegionSeats, SafetyLevel, UUID, VotingGroup } from "../types/country";
import { DEFAULT_VISIBLE_COUNTRY_NAME, TEXT_REGIONS, VOTING_GROUP_NAME_TEXT } from "../ui/messages";
import { calculateStageFilled, ComponentIdFactory, distributeSeats, generateUniqueColor } from "../utils/countryTypesFunctions";

interface CountryStore {
    countries: Country[];
    countryCounter: number;
    regions: Region[];
    voting_groups: VotingGroup[];
    voting_groups_counter: Record<UUID, number>;
    party_candidates: PartyCandidate[],
    president_person_candidates: PresidentPersonCandidate[];
    party_person_candidates: PartyPersonCandidate[];
    used_president_candidate_hues: Record<UUID, number[]>;
    used_party_candidate_hues: Record<UUID, number[]>;

    addCountry: () => void;
    updateCountryLabel: (id: UUID, label: string) => void;
    copyCountry: (id: UUID) => void; //!need return later to this task
    deleteCountry: (id: UUID) => void; //!need return later to this task
    changeRegionSafetyLevel: (regionId: UUID, safetyLevel: SafetyLevel) => void;
    addGroup: (countryId: UUID) => void;
    updateVotingGroupPosition: (id: UUID, x: number,
        y: number, regionId: UUID) => void;
    updateGroup: (id: string, data: Partial<VotingGroup>) => void;
    deleteGroup: (id: string) => void;
    changeElectionMode: (
        countryId: string,
        electionMode: ElectionMode
    ) => void;

    updateCountryDescr: (
        countryId: string,
        descr: string
    ) => void;

    addPresidentCandidate: (countryId: UUID) => void;
    updatePresidentCandidate: (candidateId: UUID,
        data: Partial<PresidentPersonCandidate>) => void;

    countSeats: (countryId: UUID) => void;
}

export const useCountryStore = create<CountryStore>((set, get) => ({
    countries: [],
    countryCounter: 0,
    regions: [],
    voting_groups: [],
    voting_groups_counter: {},
    party_candidates: [],
    president_person_candidates: [],
    party_person_candidates: [],
    used_president_candidate_hues: {},
    used_party_candidate_hues: {},


    addCountry: () => {
        const countryId = uuidv4();
        const regionsInCountry: Region[] = [];

        Object.entries(REGIONS_SETTINGS).forEach(
            ([regionKey]) => {
                const regionId = uuidv4();
                const displayInTable = TEXT_REGIONS.find(region => region.key === regionKey)?.displayInTable;
                if (!displayInTable) return;
                regionsInCountry.push({
                    id: regionId,
                    countryId: countryId,
                    regionKeyName: regionKey as RegionKeyName,
                    displayInTable: displayInTable,
                    component_id:
                        ComponentIdFactory.region(countryId, regionId),
                    safety_level: 5,
                    seats: 1
                });
            }
        );
        set((state) => {
            const countryNumForName = state.countryCounter + 1;
            return {
                countryCounter: state.countryCounter + 1,

                countries: [
                    ...state.countries,
                    {
                        id: countryId,
                        componentId: ComponentIdFactory.country(countryId),
                        label: `${DEFAULT_VISIBLE_COUNTRY_NAME} ${countryNumForName}`,
                        electionMode: ELECTION_MODE_SETTINGS.presidential.key as ElectionMode,
                        descr: "",
                        totalSeats: 5
                    },
                ],
                regions:
                    state.regions.concat(regionsInCountry),
                voting_groups_counter: {
                    ...state.voting_groups_counter,
                    [countryId]: 0,
                },
            };
        });
    },

    updateCountryLabel: (id, label) =>
        set((state) => {
            const updated = {
                countries: state.countries.map((c) =>
                    c.id === id ? { ...c, label } : c
                ),
            };
            return updated;
        }),

    //return here !!!!!!!!!!!!!!!!!
    copyCountry: (id) =>
        set((state) => {
            const countryToCopy = state.countries.find(
                (country) => country.id === id
            );

            if (!countryToCopy) {
                return state;
            }

            const newId = uuidv4();

            return {
                countries: [
                    ...state.countries,
                    {
                        ...countryToCopy,
                        id: newId,
                        componentId: `country_${newId}`,
                    },
                ],
            };
        }),
    //return here !!!!!!!!!!!!!!!!!
    deleteCountry: (id) =>
        set((state) => ({
            countries: state.countries.filter(
                (country) => country.id !== id
            ),
        })),

    changeRegionSafetyLevel: (
        regionId: string,
        safetyLevel: SafetyLevel
    ) => {
        set((state) => ({
            regions: state.regions.map((region) =>
                region.id === regionId
                    ? {
                        ...region,
                        safety_level: safetyLevel,
                    }
                    : region
            ),
        }));
    },

    addGroup: (countryId: string) => {
        const groupId = uuidv4();
        set((state) => {
            const voter_number =
                state.voting_groups_counter[countryId] + 1;
            const region = state.regions.find(
                (r) => r.regionKeyName === DEFAULT_VOTING_GROUP_SETTING.regionKey && r.countryId === countryId
            );
            if (!region) return state;
            return {
                voting_groups: [
                    ...state.voting_groups,
                    {
                        id: groupId,
                        countryId,
                        regionId: region.id,
                        componentId: ComponentIdFactory.group(countryId, groupId),
                        name: `${VOTING_GROUP_NAME_TEXT} ${voter_number}`,
                        details_descr: {
                            age: "",
                            sex: "",
                            nationality: "",
                            identity: "",
                            religion: "",
                            peopleCount: 0,
                        },
                        stageFilled: "not filled",
                        x: DEFAULT_VOTING_GROUP_SETTING.x,
                        y: DEFAULT_VOTING_GROUP_SETTING.y,
                    },
                ],
                voting_groups_counter: {
                    ...state.voting_groups_counter,
                    [countryId]: voter_number,
                },
            };
        });
    },

    updateVotingGroupPosition: (id, x, y, regionId
    ) => {
        set((state) => ({
            voting_groups: state.voting_groups.map((group) =>
                group.id === id
                    ? {
                        ...group,
                        x,
                        y,
                        regionId,
                    }
                    : group
            ),
        }));
        const group = get().voting_groups.find(group => group.id === id);
        if (group)
            get().countSeats(group.countryId);
    },
    updateGroup: (id, data) => {
        set((state) => {
            const voting_groups = state.voting_groups.map((g) => {
                if (g.id !== id) return g;

                const updated = {
                    ...g,
                    ...data,
                    details_descr: {
                        ...g.details_descr,
                        ...(data.details_descr ?? {}),
                    },
                };

                return {
                    ...updated,
                    stageFilled: calculateStageFilled(updated),
                };
            });

            return { voting_groups };
        });
        const group = get().voting_groups.find(group => group.id === id);
        if (group)
            get().countSeats(group.countryId);
    },
    deleteGroup: (id) => {
        const group = get().voting_groups.find(group => group.id === id);
        set((state) => ({
            voting_groups: state.voting_groups.filter((g) => g.id !== id)
        }));
        if (group)
            get().countSeats(group.countryId);
    },

    changeElectionMode: (
        countryId: string,
        electionMode: ElectionMode
    ) => {
        set((state) => ({
            countries: state.countries.map(country =>
                country.id === countryId
                    ? {
                        ...country,
                        electionMode
                    }
                    : country
            )
        }));
    },

    updateCountryDescr: (countryId, descr) => {
        set((state) => ({
            countries: state.countries.map((country) =>
                country.id === countryId
                    ? { ...country, descr }
                    : country
            )
        }));
    },

    addPresidentCandidate: (countryId) => {
        const candidateId = uuidv4();

        set((state) => {
            const used =
                state.used_president_candidate_hues[countryId] ?? [];

            const { color, hue } = generateUniqueColor(used);

            return {
                president_person_candidates: [
                    ...state.president_person_candidates,
                    {
                        id: candidateId,
                        countryId,
                        componentId:
                            ComponentIdFactory.personCandidate(countryId, candidateId),
                        color,

                        name: "",
                        experience: "",
                        promise: "",

                        media: {
                            positive: CANDIDATE_SETTINGS.min_media,
                            negative: CANDIDATE_SETTINGS.max_madia,
                        },

                        election_rating: CANDIDATE_SETTINGS.min_rating,
                    },
                ],

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
    countSeats: (countryId: UUID) => {
        const regions = get().regions.filter(r => r.countryId === countryId);

        const regionSeats: RegionSeats[] = [];

        regions.forEach(region => {
            const voters = get().voting_groups.filter(v => v.regionId === region.id);

            const peopleCount = voters.reduce((sum, voter) => {
                return sum + voter.details_descr.peopleCount;
            }, 0);

            regionSeats.push({
                regionId: region.id,
                population: peopleCount
            });
        });

        const seats = distributeSeats(regionSeats);

        set((state) => {
            let totalSeats = 0;

            const updatedRegions = state.regions.map(region => {
                if (region.countryId === countryId) {
                    const newSeats = seats[region.id] ?? REGION_SEATS.min;
                    totalSeats += newSeats;

                    return {
                        ...region,
                        seats: newSeats
                    };
                }

                return region;
            });

            return {
                regions: updatedRegions,
                countries: state.countries.map(country =>
                    country.id === countryId
                        ? {
                            ...country,
                            totalSeats
                        }
                        : country
                )
            };
        });
    }
}));