import { createPartyCandidate, createPartyPersonCandidate, createPresidentCandidate } from "../factories/candidate/candidatesFactory";
import { useCandidateStore } from "../store/candidateStore";
import type { PartyCandidate } from "../types/candidate";
import type { UUID } from "../types/general";
import { generateUniqueColor } from "../utils/candidate/generateUniqueColor";

export function addPresidentCandidateService(countryId: UUID) {
    const usedColorsRecord = useCandidateStore.getState().getPresidentCandidateHues(countryId);
    const usedColors = Object.values(usedColorsRecord);
    const { color, hue } = generateUniqueColor(usedColors);
    const person = createPresidentCandidate(countryId, color);
    useCandidateStore.getState().addPresidentCandidate(person);

    useCandidateStore.getState().updatePresidentCandidateHues(countryId, person.id, hue);
}

export function addPartyCandidateService(countryId: UUID, regionsId: UUID[]) {
    const usedColorsRecord = useCandidateStore.getState().getPartyCandidateHues(countryId);
    const usedColors = Object.values(usedColorsRecord);
    const { color, hue } = generateUniqueColor(usedColors);
    const party = createPartyCandidate(countryId, color);
    useCandidateStore.getState().addPartyCandidate(party);
    useCandidateStore.getState().updatePartyCandidateHues(countryId, party.id, hue);
    useCandidateStore.getState().setUsedPartyPersonRegionsSeats(regionsId, party.id);
}

export function addPartyPersonCandidateService(regionId: UUID, party: PartyCandidate) {
    const party_person = createPartyPersonCandidate(party, regionId);
    useCandidateStore.getState().addPartyPersonCandidate(party_person);
    useCandidateStore.getState().updateRegionSeatsAfterChanges(party.id, regionId, "add");
}

export function updateRegionCandidateService(candidateId: UUID, partyId: UUID, oldRegionId: UUID, newRegionId: UUID) {
    useCandidateStore.getState().updatePartyPersonCandidate(candidateId, { regionId: newRegionId });
    useCandidateStore.getState().updateRegionSeatsCandidate(partyId, oldRegionId, newRegionId);
}

export function deletePresidentCandidateService(candidate_id: UUID) {
    useCandidateStore.getState().deletePresidentCandidate(candidate_id);
    useCandidateStore.getState().deletePresidentCandidateHues(candidate_id);
}

export function deletePartyPersonCandidateService(candidate_id: UUID, party_id: UUID, regionId: UUID) {
    useCandidateStore.getState().deletePartyPersonCandidate(candidate_id);
    useCandidateStore.getState().updateRegionSeatsAfterChanges(party_id, regionId, "delete");
}

export function deletePartyCandidate(party_id: UUID) {
    useCandidateStore.getState().deletePartyCandidate(party_id);
    useCandidateStore.getState().deleteAllPartyPersons(party_id);
    useCandidateStore.getState().deletePartyCandidateHues(party_id);
    useCandidateStore.getState().deleteRegionSeatsCandidate(party_id);
}