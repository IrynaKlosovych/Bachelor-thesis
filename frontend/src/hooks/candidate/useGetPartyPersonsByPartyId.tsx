import { useCandidateStore } from "../../store/candidateStore";
import type { UUID } from "../../types/general";

export default function useGetPartyPersonsByPartyId(partyId: UUID) {
    const allCandidates = useCandidateStore(state => state.party_person_candidates);
    const candidatesByPartyId = allCandidates.filter(c => c.partyID === partyId);
    return candidatesByPartyId;
}