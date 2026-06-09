import { createPartyCandidate, createPartyPersonCandidate,createPresidentCandidate } from "../factories/candidate/candidatesFactory";
import { useCandidateStore } from "../store/candidateStore";
import type { PartyCandidate } from "../types/candidate";
import type { UUID } from "../types/general";
import { generateUniqueColor } from "../utils/candidate/generateUniqueColor";

export function addPresidentCandidateService(countryId: UUID) {
    const usedColors = useCandidateStore.getState().getPresidentCandidateHues(countryId);
    const { color, hue } = generateUniqueColor(usedColors);
    const person = createPresidentCandidate(countryId, color);
    useCandidateStore.getState().addPresidentCandidate(person);
    useCandidateStore.getState().updatePresidentCandidateHues(countryId, usedColors, hue);
}

export function addPartyCandidateService(countryId: UUID, regionsId: UUID[]) {
    const usedColors = useCandidateStore.getState().getPartyCandidateHues(countryId);
    const { color, hue } = generateUniqueColor(usedColors);
    const party = createPartyCandidate(countryId, color);
    useCandidateStore.getState().addPartyCandidate(party);
    useCandidateStore.getState().updatePartyCandidateHues(countryId, usedColors, hue);
    useCandidateStore.getState().setUsedPartyPersonRegionsSeats(regionsId, party.id);
}

export function addPartyPersonCandidateService(regionId: UUID, party: PartyCandidate) {
    const party_person = createPartyPersonCandidate(party, regionId);
    useCandidateStore.getState().addPartyPersonCandidate(party_person);
    useCandidateStore.getState().updateRegionSeatsAfterAddingPerson(party.id, regionId);
}

export function updateRegionCandidateService(candidateId: UUID, partyId: UUID, oldRegionId: UUID, newRegionId: UUID) {
    useCandidateStore.getState().updatePartyPersonCandidate(candidateId, { regionId: newRegionId });
    useCandidateStore.getState().updateRegionSeatsCandidate(partyId, oldRegionId, newRegionId);
}