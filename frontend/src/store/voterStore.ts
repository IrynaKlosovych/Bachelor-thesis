import { create } from "zustand";

import type { UUID } from "../types/general";
import type { StageFilled, VotingGroup } from "../types/voter";

interface VoterStore {
    voting_groups: VotingGroup[];
    voting_groups_counter: Record<UUID, number>;

    setVotingGroupCounter: (countryId: UUID, number: number) => void;
    getVotingGroupCounter: (countryId: UUID) => number;
    addGroup: (voter: VotingGroup) => void;
    getVotersByCountryId: (countryId: UUID) => VotingGroup[];
    updateVotingGroupPosition: (id: UUID, x: number,
        y: number, regionId: UUID) => void;
    updateGroup: (updated: VotingGroup, stageFilled: StageFilled) => void;
    deleteGroup: (id: string) => void;
    deleteCountryGroups: (countryId: UUID) => void;
    deleteGroupsCounterbyCountryId: (countryId: UUID) => void;
    getCountryIdByVoterId: (voterId: UUID) => UUID | undefined;
    addCopiedVotingGroups: (newVoters: VotingGroup[]) => void;
}

export const useVoterStore = create<VoterStore>((set, get) => ({
    voting_groups: [],
    voting_groups_counter: {},

    setVotingGroupCounter: (countryId: UUID, number: number) => {
        set((state) => {
            return {
                voting_groups_counter: {
                    ...state.voting_groups_counter,
                    [countryId]: number,
                },
            };
        });
    },

    getVotingGroupCounter: (countryId) => {
        return get().voting_groups_counter[countryId];
    },

    addGroup: (voter) => {
        set((state) => {
            return {
                voting_groups: [
                    ...state.voting_groups,
                    voter
                ],
            };
        });
    },

    getVotersByCountryId: (countryId: UUID) => {
        return get().voting_groups.filter(group => group.countryId === countryId);
    },

    updateVotingGroupPosition: (id, x, y, regionId
    ) => {
        set((state) => ({
            voting_groups: state.voting_groups.map((group) =>
                group.id === id
                    ? {
                        ...group,
                        x,
                        y,
                        regionId,
                    }
                    : group
            ),
        }));
    },

    updateGroup: (updated, stageFilled) => {
        set((state) => {
            const voting_groups = state.voting_groups.map((g) => {
                if (g.id !== updated.id) return g;

                return {
                    ...updated,
                    stageFilled,
                };
            });

            return { voting_groups };
        });
    },

    deleteGroup: (id) => {
        set((state) => ({
            voting_groups: state.voting_groups.filter((g) => g.id !== id)
        }));
    },

    deleteCountryGroups: (countryId: UUID) => {
        set((state) => {
            return {
                voting_groups: state.voting_groups.filter(
                    (r) => r.countryId !== countryId
                ),
            };
        });
    },

    deleteGroupsCounterbyCountryId: (countryId) => {
        set((state) => {
            const rest = Object.fromEntries(
                Object.entries(state.voting_groups_counter)
                    .filter(([key]) => key !== countryId)
            );
            return {
                voting_groups_counter: rest
            };
        });
    },

    getCountryIdByVoterId: (voterId) => {
        return get().voting_groups.find(v => v.id === voterId)?.countryId;
    },

    addCopiedVotingGroups: (newVoters: VotingGroup[]) => {
        set((state) => {
            return {
                voting_groups: [
                    ...state.voting_groups,
                    ...newVoters
                ],
            };
        });
    },
}));