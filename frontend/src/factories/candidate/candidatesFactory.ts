import { v4 as uuidv4 } from "uuid";

import { CANDIDATE_SETTINGS } from "../../constants/candidate";
import type { PersonCandidate } from "../../types/candidate";
import type { UUID } from "../../types/general";
import { ComponentIdFactory } from "../../utils/general/countryTypesFunctions";

export function createPresidentCandidate(countryId: UUID, color: string): PersonCandidate {
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