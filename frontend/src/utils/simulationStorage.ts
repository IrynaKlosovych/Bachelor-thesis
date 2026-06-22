import { useEffect } from "react";

import { useCandidateStore } from "../store/candidateStore";
import { useCountryStore } from "../store/countryStore";
import { useRegionStore } from "../store/regionStore";
import { useVoterStore } from "../store/voterStore";

const STORAGE_KEY = "simulation-auto";

export const initAutoSave = () => {
    const save = () => {
        const state = {
            country: useCountryStore.getState(),
            region: useRegionStore.getState(),
            candidate: useCandidateStore.getState(),
            voter: useVoterStore.getState(),
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    };

    useCountryStore.subscribe(save);
    useRegionStore.subscribe(save);
    useCandidateStore.subscribe(save);
    useVoterStore.subscribe(save);
};

export const useAutoLoad = () => {
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) return;

        const state = JSON.parse(saved);

        useCountryStore.setState(state.country);
        useRegionStore.setState(state.region);
        useCandidateStore.setState(state.candidate);
        useVoterStore.setState(state.voter);
    }, []);
};