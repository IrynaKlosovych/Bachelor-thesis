import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { Country, Region, SafetyLevel, VotingGroup } from "../types/country";
import { DEFAULT_VISIBLE_COUNTRY_NAME } from "../ui/messages";
import { REGIONS_SETTINGS } from "../constants/constants";

interface CountryStore {
    countries: Country[];
    countryCounter: number;
    regions: Region[];
    voting_groups: VotingGroup[];

    addCountry: () => void;
    updateCountryLabel: (id: string, label: string) => void;
    copyCountry: (id: string) => void; //!need return later to this task
    deleteCountry: (id: string) => void; //!need return later to this task
    changeRegionSafetyLevel: (
        regionId: string,
        safetyLevel: SafetyLevel
    ) => void;

    // addGroup: (group: VotingGroup) => void;
    // updateGroup: (id: string, data: Partial<VotingGroup>) => void;
    // deleteGroup: (id: string) => void;
}

export const useCountryStore = create<CountryStore>((set) => ({
    countries: [],
    countryCounter: 0,
    regions: [],
    voting_groups: [],

    addCountry: () => {
        const countryId = uuidv4();

        set((state) => {
            const countryNumForName = state.countryCounter + 1;
            const regions: Region[] = [];

            Object.entries(REGIONS_SETTINGS).forEach(
                ([regionKey, regionSettings]) => {
                    const regionId = uuidv4();

                    regions.push({
                        id: regionId,
                        countryId: countryId,
                        regionKeyName: regionKey,
                        d: regionSettings.d,
                        component_id:
                            `country_${countryId}_map_region_${regionId}`,
                        safety_level: 5,
                    });
                }
            );

            return {
                countryCounter: state.countryCounter + 1,

                countries: [
                    ...state.countries,
                    {
                        id: countryId,
                        componentId: `country_${countryId}`,
                        label: `${DEFAULT_VISIBLE_COUNTRY_NAME} ${countryNumForName}`
                    },
                ],
                regions: [
                    ...state.regions,
                    ...regions
                ]
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

    // addGroup: (group) =>
    //     set((state) => ({
    //         groups: [...state.groups, group]
    //     })),

    // updateGroup: (id, data) =>
    //     set((state) => ({
    //         groups: state.groups.map((g) =>
    //             g.id === id ? { ...g, ...data } : g
    //         )
    //     })),

    // deleteGroup: (id) =>
    //     set((state) => ({
    //         groups: state.groups.filter((g) => g.id !== id)
    //     })),
}));