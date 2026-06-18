import { v4 as uuidv4 } from "uuid";

import { CANDIDATE_SETTINGS } from "../../constants/candidate";
import type { BasePersonCandidate, PartyCandidate, PartyPersonCandidate, PresidentPersonCandidate } from "../../types/candidate";
import type { UUID } from "../../types/general";
import { ComponentIdFactory } from "../../utils/general/countryTypesFunctions";

export function createPresidentCandidate(countryId: UUID, color: string): BasePersonCandidate {
    const candidateId = uuidv4();
    const person = {
        id: candidateId,
        countryId,
        componentId:
            ComponentIdFactory.personCandidate(countryId, candidateId),
        color,

        name: "",
        experience: "",
        promise: "",

        media: {
            positive: CANDIDATE_SETTINGS.min_media,
            negative: CANDIDATE_SETTINGS.max_madia,
        },

        election_rating: CANDIDATE_SETTINGS.min_rating,
    };
    return person;
}

export function createPartyCandidate(countryId: UUID, color: string): PartyCandidate {
    const candidateId = uuidv4();
    const party = {
        id: candidateId,
        countryId,
        componentId:
            ComponentIdFactory.partyCandidate(countryId, candidateId),
        color,

        name: "",
        experience: "",
        promise: "",

        media: {
            positive: CANDIDATE_SETTINGS.min_media,
            negative: CANDIDATE_SETTINGS.max_madia,
        },

        election_rating: CANDIDATE_SETTINGS.min_rating,
    };
    return party;
}

export function createPartyPersonCandidate(party: PartyCandidate, regionId: UUID): PartyPersonCandidate {
    const candidateId = uuidv4();
    const person = {
        id: candidateId,
        countryId: party.countryId,
        componentId:
            ComponentIdFactory.personCandidate(party.countryId, candidateId),
        color: party.color,

        name: "",
        experience: "",
        promise: "",

        media: {
            positive: CANDIDATE_SETTINGS.min_media,
            negative: CANDIDATE_SETTINGS.max_madia,
        },

        election_rating: CANDIDATE_SETTINGS.min_rating,
        regionId,
        partyID: party.id
    };
    return person;
}

export function copyPresidentCandidate(countryId: UUID, countryToCopy: PresidentPersonCandidate): BasePersonCandidate {
    const candidateId = uuidv4();
    return {
        ...countryToCopy,
        id: candidateId,
        countryId,
        componentId:
            ComponentIdFactory.personCandidate(countryId, candidateId)
    };
}

export function copyPartyCandidate(countryId: UUID, partyToCopy: PartyCandidate): PartyCandidate {
    const candidateId = uuidv4();
    return {
        ...partyToCopy,
        id: candidateId,
        countryId,
        componentId:
            ComponentIdFactory.partyCandidate(countryId, candidateId),
    };
}

export function copyPartyPersonCandidate(regionId: UUID, party: PartyCandidate, partyPersonToCopy: PartyPersonCandidate): PartyPersonCandidate {
    const candidateId = uuidv4();
    return {
        ...partyPersonToCopy,
        id: candidateId,
        countryId: party.countryId,
        componentId:
            ComponentIdFactory.personCandidate(party.countryId, candidateId),
        regionId,
        partyID: party.id
    };
}