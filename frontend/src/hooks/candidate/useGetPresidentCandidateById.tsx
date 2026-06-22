import { useCandidateStore } from "../../store/candidateStore";
import type { UUID } from "../../types/general";

export function useGetPresidentCandidateById(id: UUID) {
    const allCandidates = useCandidateStore(state => state.president_person_candidates);
    const candidateById = allCandidates.find(c => c.id === id);
    return candidateById;
}