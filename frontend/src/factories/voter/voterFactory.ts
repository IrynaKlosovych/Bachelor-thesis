import { v4 as uuidv4 } from "uuid";

import { DEFAULT_VOTING_GROUP_SETTING } from "../../constants/voter";
import type { UUID } from "../../types/general";
import type { StageFilled, VotingGroup } from "../../types/voter";
import { VOTING_GROUP_NAME_TEXT } from "../../ui/voter_messages";
import { ComponentIdFactory } from "../../utils/general/countryTypesFunctions";

export function createVoter(countryId: UUID, regionId: UUID, voter_number: number): VotingGroup {
    const voterId = uuidv4();
    const voter = {
        id: voterId,
        countryId,
        regionId: regionId,
        componentId: ComponentIdFactory.group(countryId, voterId),
        name: `${VOTING_GROUP_NAME_TEXT} ${voter_number}`,
        details_descr: {
            age: "",
            sex: "",
            nationality: "",
            identity: "",
            religion: "",
            peopleCount: 0,
        },
        stageFilled: "not filled" as StageFilled,
        x: DEFAULT_VOTING_GROUP_SETTING.x,
        y: DEFAULT_VOTING_GROUP_SETTING.y,
    };
    return voter;
}

export function updateVoter(votingGroupToUpdate: VotingGroup, data: Partial<VotingGroup>): VotingGroup {
    const updated = {
        ...votingGroupToUpdate,
        ...data,
        details_descr: {
            ...votingGroupToUpdate.details_descr,
            ...(data.details_descr ?? {}),
        },
    };
    return updated;
}