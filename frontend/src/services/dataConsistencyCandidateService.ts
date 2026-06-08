import { createPartyCandidate,createPresidentCandidate } from "../factories/candidate/candidatesFactory";
import { useCandidateStore } from "../store/candidateStore";
import type { UUID } from "../types/general";
import { generateUniqueColor } from "../utils/candidate/generateUniqueColor";

export function addPresidentCandidateService(countryId: UUID) {
    const usedColors = useCandidateStore.getState().getPresidentCandidateHues(countryId);
    const { color, hue } = generateUniqueColor(usedColors);
    const person = createPresidentCandidate(countryId, color);
    useCandidateStore.getState().addPresidentCandidate(person);
    useCandidateStore.getState().updatePresidentCandidateHues(countryId, usedColors, hue);
}

export function addPartyCandidateService(countryId: UUID) {
    const usedColors = useCandidateStore.getState().getPartyCandidateHues(countryId);
    const { color, hue } = generateUniqueColor(usedColors);
    const party = createPartyCandidate(countryId, color);
    useCandidateStore.getState().addPartyCandidate(party);
    useCandidateStore.getState().updatePartyCandidateHues(countryId, usedColors, hue);
}