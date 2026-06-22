import { useVoterStore } from "../../store/voterStore";
import type { UUID } from "../../types/general";

export function useGetVotersByCountryId(countryId: UUID) {
    const allVoters = useVoterStore(state => state.voting_groups);
    const votersByCountryId = allVoters.filter(g => g.countryId === countryId);
    return votersByCountryId;
}