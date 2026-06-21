import { useVoterStore } from "../../store/voterStore";
import type { UUID } from "../../types/general";

export function useGetVoterByVoterId(id: UUID) {
    const allVoters = useVoterStore(state => state.voting_groups);
    const voterById = allVoters.find(v => v.id === id);
    return voterById;
}