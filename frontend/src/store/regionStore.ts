import { create } from "zustand";

import type { UUID } from "../types/general";
import type { Region, SafetyLevel } from "../types/region";

interface RegionStore {
    regions: Region[];
    addRegionsToCountry: (regionsInCountry: Region[]) => void;
    getRegionById: (regionId: UUID) => Region | undefined;
    getRegionsByCountryId: (countryId: UUID) => Region[];
    getRegionByCountryIdAndKeyName: (countryId: UUID, regionKeyName: string) => Region | undefined;
    changeRegionSafetyLevel: (regionId: UUID, safetyLevel: SafetyLevel) => void;
    copyCountryRegions: (copiedRegions: Region[]) => void;
    deleteCountryRegions: (countryId: UUID) => void;
    updateRegionSeats: (updatedRegions: Region[]) => void;
}

export const useRegionStore = create<RegionStore>((set, get) => ({
    regions: [],

    addRegionsToCountry: (regionsInCountry) => {
        set((state) => {
            return {
                regions:
                    state.regions.concat(regionsInCountry),
            };
        });
    },

    getRegionById: (regionId: UUID) => {
        return get().regions.find(r => r.id === regionId);
    },

    getRegionsByCountryId: (countryId: UUID) => {
        return get().regions.filter(region => region.countryId === countryId);
    },

    getRegionByCountryIdAndKeyName(countryId, regionKeyName) {
        return get().regions.find(
            (r) => r.regionKeyName === regionKeyName && r.countryId === countryId
        );
    },

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

    copyCountryRegions: (copiedRegions) => {
        set((state) => ({
            regions: [...state.regions, ...copiedRegions],
        }));
    },

    deleteCountryRegions: (countryId: UUID) => {
        set((state) => ({
            regions: state.regions.filter(
                (r) => r.countryId !== countryId
            ),
        }));
    },

    updateRegionSeats: (updatedRegions) => {
        set(() => {
            return {
                regions: updatedRegions,
            };
        });
    }
}));