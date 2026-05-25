import { create } from "zustand";

import type { Country, ElectionMode } from "../types/country";
import type { UUID } from "../types/general";

interface CountryStore {
    countries: Country[];
    countryCounter: number;
    getCountryNumForName: () => number;
    addCountry: (country: Country) => void;
    incrementCountryNumForName: () => void;
    getCountryById: (id: UUID) => Country | undefined;
    updateCountryLabel: (id: UUID, label: string) => void;
    copyCountry: (country: Country) => void;
    deleteCountry: (id: UUID) => void;
    changeElectionMode: (
        countryId: UUID,
        electionMode: ElectionMode
    ) => void;
    updateCountryDescr: (
        countryId: UUID,
        descr: string
    ) => void;
    updateCountryTotalSeats: (countryId: UUID, totalSeats: number) => void;
}

export const useCountryStore = create<CountryStore>((set, get) => ({
    countries: [],
    countryCounter: 0,

    getCountryNumForName: () => {
        return get().countryCounter + 1;
    },

    addCountry: (country) => {
        set((state) => {
            return {
                countries: [
                    ...state.countries,
                    country
                ],
            };
        });
    },

    incrementCountryNumForName: () => {
        set((state) => {
            return {
                countryCounter: state.countryCounter + 1,
            };
        });
    },

    getCountryById: (id: UUID) => {
        return get().countries.find(c => c.id === id);
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

    copyCountry: (country) => {
        set((state) => {
            return {
                countries: [
                    ...state.countries,
                    country
                ],
            };
        });
    },

    deleteCountry: (id) =>
        set((state) => ({
            countries: state.countries.filter(
                (country) => country.id !== id
            ),
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
    },

    updateCountryTotalSeats: (countryId, totalSeats) => {
        set((state) => {
            return {
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
    },
}));