import { create } from "zustand";

import type { Country, ElectionMode } from "../types/country";
import type { UUID } from "../types/general";

interface CountryStore {
    countries: Country[];
    countryCounter: number;
    activeCountryId: UUID | null;
    setActiveCountry: (id: UUID) => void;
    getCountryIndexById: (countryId: UUID) => number;
    getCountriesLenght: () => number;
    nextCountry: () => void;
    prevCountry: () => void;
    getCountryNumForName: () => number;
    addCountry: (country: Country) => void;
    incrementCountryNumForName: () => void;
    getCountryById: (id: UUID) => Country | undefined;
    updateCountryLabel: (id: UUID, label: string) => void;
    deleteCountry: (id: UUID) => void;
    changeActiveCountryAfterDelete: (index: number) => void;
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
    activeCountryId: null,

    setActiveCountry: (id) => {
        set({
            activeCountryId: id
        });
    },

    getCountryIndexById: (countryId) => {
        const index = get().countries.findIndex(
            (country) => country.id === countryId
        );
        return index;
    },

    getCountriesLenght: () => {
        return get().countries.length;
    },

    nextCountry: () => {
        const { countries, activeCountryId } = get();

        if (countries.length === 0) {
            return;
        }

        const currentIndex = countries.findIndex(
            (country) => country.id === activeCountryId
        );

        if (currentIndex === -1) {
            return;
        }

        const nextIndex =
            (currentIndex + 1) % countries.length;

        set({
            activeCountryId:
                countries[nextIndex].id
        });
    },

    prevCountry: () => {
        const { countries, activeCountryId } = get();

        if (countries.length === 0) {
            return;
        }

        const currentIndex = countries.findIndex(
            (country) => country.id === activeCountryId
        );

        if (currentIndex === -1) {
            return;
        }

        const prevIndex =
            (currentIndex - 1 + countries.length) %
            countries.length;

        set({
            activeCountryId:
                countries[prevIndex].id
        });
    },

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

    deleteCountry: (id) =>
        set((state) => ({
            countries: state.countries.filter(
                (country) => country.id !== id
            ),
        })),

    changeActiveCountryAfterDelete: (index) => {
        set((state) => {
            if (index === -1) {
                return state;
            }
            let newActiveCountryId: UUID | null = null;

            if (state.countries.length > 0) {
                const nextCountry =
                    state.countries[index] ??
                    state.countries[index - 1];

                newActiveCountryId = nextCountry.id;
            }

            return {
                activeCountryId: newActiveCountryId
            };
        });
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