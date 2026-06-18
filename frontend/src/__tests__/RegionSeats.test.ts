import { describe, expect, it } from "vitest";

import { REGION_SEATS } from "../constants/region";
import type { Region } from "../types/region";
import type { VotingGroup } from "../types/voter";
import { calculateRegionSeats, distributeSeats }
    from "../utils/region/distributeSeatsFunctions";

type TestVotingGroup = {
    regionId: VotingGroup["regionId"];
    details_descr: Pick<
        VotingGroup["details_descr"],
        "age" |
        "sex" |
        "nationality" |
        "identity" |
        "religion" |
        "peopleCount"
    >;
};
const createRegion = (id: string): Pick<Region, "id"> => ({
    id
});

const createVotingGroup = (
    regionId: string,
    peopleCount: number
): TestVotingGroup => ({
    regionId,
    details_descr: {
        age: "adult",
        sex: "m",
        nationality: "ua",
        identity: "none",
        religion: "none",
        peopleCount
    }
});

describe("calculateRegionSeats", () => {
    it("should calculate population per region correctly", () => {
        const regions = [
            createRegion("r1"),
            createRegion("r2")
        ];

        const votingGroups = [
            createVotingGroup("r1", 10),
            createVotingGroup("r1", 20),
            createVotingGroup("r2", 5)
        ];

        const result = calculateRegionSeats(
            regions as Region[],
            votingGroups as VotingGroup[]
        );

        expect(result).toEqual([
            { regionId: "r1", population: 30 },
            { regionId: "r2", population: 5 }
        ]);
    });

    it("should return 0 population if no voters", () => {
        const regions = [createRegion("r1")];

        const result = calculateRegionSeats(
            regions as Region[],
            []
        );

        expect(result).toEqual([
            { regionId: "r1", population: 0 }
        ]);
    });
});

describe("distributeSeats", () => {
    it("should assign MIN seats when total population is 0", () => {
        const regions = [
            { regionId: "r1", population: 0 },
            { regionId: "r2", population: 0 }
        ];

        const result = distributeSeats(regions);

        expect(result).toEqual({
            r1: REGION_SEATS.min,
            r2: REGION_SEATS.min
        });
    });

    it("should distribute seats proportionally", () => {
        const regions = [
            { regionId: "r1", population: 100 },
            { regionId: "r2", population: 50 }
        ];

        const result = distributeSeats(regions);

        const total = 150;
        const avg = total / 2;

        const r1Expected = Math.min(
            REGION_SEATS.max,
            Math.max(REGION_SEATS.min, Math.round(100 / avg))
        );

        const r2Expected = Math.min(
            REGION_SEATS.max,
            Math.max(REGION_SEATS.min, Math.round(50 / avg))
        );

        expect(result).toEqual({
            r1: r1Expected,
            r2: r2Expected
        });
    });

    it("should enforce MIN and MAX bounds", () => {
        const regions = [
            { regionId: "r1", population: 999999 },
            { regionId: "r2", population: 1 }
        ];

        const result = distributeSeats(regions);

        Object.values(result).forEach(seats => {
            expect(seats).toBeGreaterThanOrEqual(REGION_SEATS.min);
            expect(seats).toBeLessThanOrEqual(REGION_SEATS.max);
        });
    });
});