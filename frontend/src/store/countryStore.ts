import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { Country } from "../types/country";
import { DEFAULT_VISIBLE_COUNTRY_NAME } from "../ui/messages";

interface CountryStore {
    countries: Country[];
    addCountry: () => void;
    updateCountryLabel: (id: string, label: string) => void;
}

export const useCountryStore = create<CountryStore>((set) => ({
    countries: [],

    addCountry: () => {
        const id = uuidv4();

        set((state) => {
            const countryNum = state.countries.length + 1;

            return {
                countries: [
                    ...state.countries,
                    {
                        id,
                        componentId: `country_${id}`,
                        label: `${DEFAULT_VISIBLE_COUNTRY_NAME} ${countryNum}`,
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
}));