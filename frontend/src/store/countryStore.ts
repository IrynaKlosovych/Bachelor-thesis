import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

import { DEFAULT_VOTING_GROUP_SETTING, ELECTION_MODE_SETTINGS, REGIONS_SETTINGS } from "../constants/constants";
import type { Country, ElectionMode, Region, RegionKeyName, SafetyLevel, UUID, VotingGroup } from "../types/country";
import { DEFAULT_VISIBLE_COUNTRY_NAME, TEXT_REGIONS, VOTING_GROUP_NAME_TEXT } from "../ui/messages";
import { ComponentIdFactory } from "../utils/countryTypesFunctions";

interface CountryStore {
    countries: Country[];
    countryCounter: number;
    regions: Region[];
    voting_groups: VotingGroup[];
    voting_groups_counter: Record<UUID, number>;

    addCountry: () => void;
    updateCountryLabel: (id: UUID, label: string) => void;
    copyCountry: (id: UUID) => void; //!need return later to this task
    deleteCountry: (id: UUID) => void; //!need return later to this task
    changeRegionSafetyLevel: (regionId: UUID, safetyLevel: SafetyLevel) => void;
    addGroup: (countryId: UUID) => void;
    updateVotingGroupPosition: (id: UUID, x: number,
        y: number, regionId: UUID) => void;
    // updateGroup: (id: string, data: Partial<VotingGroup>) => void;
    deleteGroup: (id: string) => void;
    changeElectionMode: (
        countryId: string,
        electionMode: ElectionMode
    ) => void;

    updateCountryDescr: (
        countryId: string,
        descr: string
    ) => void;
}

export const useCountryStore = create<CountryStore>((set) => ({
    countries: [],
    countryCounter: 0,
    regions: [],
    voting_groups: [],
    voting_groups_counter: {},

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
                        peopleCount: 0,
                        details_descr: {
                            age: "",
                            sex: "",
                            nationality: "",
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
    },
    // updateGroup: (id, data) =>
    //     set((state) => ({
    //         groups: state.groups.map((g) =>
    //             g.id === id ? { ...g, ...data } : g
    //         )
    //     })),

    deleteGroup: (id) =>
        set((state) => ({
            voting_groups: state.voting_groups.filter((g) => g.id !== id)
        })),

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
    }
}));