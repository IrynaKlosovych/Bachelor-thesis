import type { StageFilled, VotingGroup } from "../../types/voter";
import { VOTERS_SETTINGS_TABLE } from "../../ui/voters-settings-table";

export const calculateStageFilled = (
    group: VotingGroup
): StageFilled => {
    const d = group.details_descr;

    const filledCount = VOTERS_SETTINGS_TABLE.filter((field) => {
        const value = d[field.name];

        if (field.name === "peopleCount") {
            return typeof value === "number" && value > 0;
        }

        return value !== "";
    }).length;

    const total = VOTERS_SETTINGS_TABLE.length;

    if (filledCount === total) return "ready";
    if (filledCount >= total / 2) return "almost";
    return "not filled";
};