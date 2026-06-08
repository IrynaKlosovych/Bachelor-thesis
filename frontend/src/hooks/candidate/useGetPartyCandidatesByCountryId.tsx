import { useCandidateStore } from "../../store/candidateStore";
import type { UUID } from "../../types/general";

export default function useGetPartyCandidatesByCountryId(countryId: UUID) {
    const allCandidates = useCandidateStore(state => state.party_candidates);
    const candidatesByCountryId = allCandidates.filter(c => c.countryId === countryId);
    return candidatesByCountryId;
}