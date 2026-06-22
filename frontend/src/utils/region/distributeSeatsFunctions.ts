import { REGION_SEATS } from "../../constants/region";
import type { Region, RegionSeats } from "../../types/region";
import type { VotingGroup } from "../../types/voter";

export function calculateRegionSeats(regions: Region[], votingGroups: VotingGroup[]): RegionSeats[] {
    return regions.map(region => {
        const voters = votingGroups.filter(
            v => v.regionId === region.id
        );

        const peopleCount = voters.reduce((sum, v) => {
            return sum + v.details_descr.peopleCount;
        }, 0);

        return {
            regionId: region.id,
            population: peopleCount
        };
    });
}

export function distributeSeats(regions: RegionSeats[]) {
    const MIN = REGION_SEATS.min;
    const MAX = REGION_SEATS.max;

    const totalPopulation =
        regions.reduce((sum, r) => sum + r.population, 0);

    const averagePopulation =
        totalPopulation / regions.length;

    return Object.fromEntries(
        regions.map(r => {
            let seats;
            if (totalPopulation === 0) {
                seats = MIN;
            }
            else {
                const ratio =
                    r.population / averagePopulation;
                seats = Math.round(ratio);
            }
            seats = Math.max(MIN, seats);
            seats = Math.min(MAX, seats);

            return [r.regionId, seats];
        })
    );
}