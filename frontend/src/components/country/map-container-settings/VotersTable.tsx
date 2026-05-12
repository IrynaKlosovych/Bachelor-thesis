import { useCountryStore } from "../../../store/countryStore";
import type { VotingGroup } from "../../../types/country";

import RegionTable from "./RegionTable";
interface VotersTableProps {
    countryId: string;
}

export default function VotersTable({
    countryId
}: VotersTableProps) {

    const allVoters = useCountryStore(
        state => state.voting_groups
    );
    const allRegions = useCountryStore(state => state.regions);

    const votersChoosenCountry =
        allVoters.filter(
            voter => voter.countryId === countryId
        );

    const regions = allRegions.filter(r => r.countryId === countryId);

    const groupedByRegion =
        votersChoosenCountry.reduce((acc, group) => {

            if (!acc[group.regionId]) {
                acc[group.regionId] = [];
            }

            acc[group.regionId].push(group);

            return acc;

        }, {} as Record<string, VotingGroup[]>);

    return (
        <>
            {Object.entries(groupedByRegion)
                .sort(([regionIdA], [regionIdB]) => {

                    const regionA = regions.find(
                        region => region.id === regionIdA
                    );

                    const regionB = regions.find(
                        region => region.id === regionIdB
                    );

                    return (regionA?.displayInTable || "")
                        .localeCompare(
                            regionB?.displayInTable || "",
                            undefined,
                            { numeric: true }
                        );
                })
                .map(([regionId, regionGroups]) => (

                    <RegionTable
                        key={`table_country_${countryId}_region_${regionId}`}
                        regionId={regionId}
                        regionGroups={regionGroups}/>
                ))}
        </>
    );
}