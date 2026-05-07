import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { Country, Region, SafetyLevel } from "../types/country";
import { DEFAULT_VISIBLE_COUNTRY_NAME } from "../ui/messages";
import { REGIONS_SETTINGS } from "../constants/constants";

interface CountryStore {
    countries: Country[];
    addCountry: () => void;
    updateCountryLabel: (id: string, label: string) => void;
    copyCountry: (id: string) => void;
    deleteCountry: (id: string) => void;
    changeRegionSafetyLevel: (
        countryId: string,
        regionId: string,
        safetyLevel: SafetyLevel
    ) => void;
}

export const useCountryStore = create<CountryStore>((set) => ({
    countries: [],

    addCountry: () => {
        const countryId = uuidv4();

        set((state) => {
            const countryNum = state.countries.length + 1;
            const regions: Record<string, Region> = {};

            Object.entries(REGIONS_SETTINGS).forEach(
                ([regionKey, regionSettings]) => {
                    const regionId = uuidv4();

                    regions[regionKey] = {
                        id: regionId,
                        d: regionSettings.d,

                        component_id:
                            `country_${countryId}_map_region_${regionId}`,

                        safety_level: 1,
                    };
                }
            );

            return {
                countries: [
                    ...state.countries,
                    {
                        id: countryId,
                        componentId: `country_${countryId}`,
                        label: `${DEFAULT_VISIBLE_COUNTRY_NAME} ${countryNum}`,
                        regions: regions
                    },
                ],
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
    deleteCountry: (id) =>
        set((state) => ({
            countries: state.countries.filter(
                (country) => country.id !== id
            ),
        })),

    changeRegionSafetyLevel: (
        countryId: string,
        regionId: string,
        safetyLevel: SafetyLevel
    ) => {
        set((state) => ({
            countries: state.countries.map((country) => {
                if (country.id !== countryId) {
                    return country;
                }
                const regionKey = Object.keys(country.regions).find(
                    (key) => country.regions[key].id === regionId
                );

                if (!regionKey) return country;

                return {
                    ...country,

                    regions: {
                        ...country.regions,

                        [regionKey]: {
                            ...country.regions[regionKey],

                            safety_level: safetyLevel,
                        },
                    },
                };
            }),
        }));
    },
}));