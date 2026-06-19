import { DEFAULT_VOTING_GROUP_SETTING } from "../constants/voter";
import { createVoter, updateVoter } from "../factories/voter/voterFactory";
import { useCountryStore } from "../store/countryStore";
import { useRegionStore } from "../store/regionStore";
import { useVoterStore } from "../store/voterStore";
import type { UUID } from "../types/general";
import type { VotingGroup } from "../types/voter";
import { calculateRegionSeats, distributeSeats } from "../utils/region/distributeSeatsFunctions";
import { calculateStageFilled } from "../utils/voter/calculateStageFilled";

export function addGroupService(countryId: UUID) {
    const region = useRegionStore.getState().getRegionByCountryIdAndKeyName(countryId, DEFAULT_VOTING_GROUP_SETTING.regionKey);
    if (!region) return;

    const voter_number = useVoterStore.getState().getVotingGroupCounter(countryId) + 1;
    const voter = createVoter(countryId, region.id, voter_number);

    useVoterStore.getState().addGroup(voter);
    useVoterStore.getState().setVotingGroupCounter(countryId, voter_number);
}

export function updateVotingGroupPositionService(voterId: UUID, x: number, y: number, regionId: UUID) {
    useVoterStore.getState().updateVotingGroupPosition(voterId, x, y, regionId);

    const countryId = useVoterStore.getState().getCountryIdByVoterId(voterId);
    if (!countryId) return;
    updateSeats(countryId);
};

export function updateGroupService(voterId: string, data: Partial<VotingGroup>) {
    const votingGroupToUpdate = useVoterStore.getState().voting_groups.find(g => g.id === voterId);

    if (!votingGroupToUpdate) return;
    const updated = updateVoter(votingGroupToUpdate, data);

    const stageFilled = calculateStageFilled(updated);
    useVoterStore.getState().updateGroup(updated, stageFilled);

    const countryId = useVoterStore.getState().getCountryIdByVoterId(voterId);
    if (!countryId) return;
    updateSeats(countryId);
}

export function deleteGroupService(voterId: UUID) {
    const countryId = useVoterStore.getState().getCountryIdByVoterId(voterId);
    useVoterStore.getState().deleteGroup(voterId);

    if (!countryId) return;
    updateSeats(countryId);
}

function updateSeats(countryId: UUID) {
    const regions = useRegionStore.getState().getRegionsByCountryId(countryId);
    const votingGroups = useVoterStore.getState().getVotersByCountryId(countryId);

    const regionSeats = calculateRegionSeats(regions, votingGroups);
    const seats = distributeSeats(regionSeats);

    let totalSeats = 0;
    const totalRegions = useRegionStore.getState().regions;
    const updatedRegions = totalRegions.map(region => {
        if (region.countryId === countryId) {
            const newSeats = seats[region.id];
            totalSeats += newSeats;
            return {
                ...region,
                seats: newSeats
            };
        }
        return region;
    });
    useRegionStore.getState().updateRegionSeats(updatedRegions);
    useCountryStore.getState().updateCountryTotalSeats(countryId, totalSeats);
}