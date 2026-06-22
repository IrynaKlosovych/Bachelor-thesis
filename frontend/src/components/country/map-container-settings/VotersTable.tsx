import { useGetRegionsByCountryId } from "../../../hooks/region/useGetRegionsByCountryId";
import { useGetVotersByCountryId } from "../../../hooks/voter/useGetVotersByCountryId";
import type { UUID } from "../../../types/general";
import type { VotingGroup } from "../../../types/voter";

import RegionTable from "./RegionTable";
interface VotersTableProps {
    countryId: string;
}

export default function VotersTable({ countryId }: VotersTableProps) {

    const votersChoosenCountry = useGetVotersByCountryId(countryId);

    const regions = useGetRegionsByCountryId(countryId);

    const groupedByRegion =
        votersChoosenCountry.reduce((acc, group) => {

            if (!acc[group.regionId]) {
                acc[group.regionId] = [];
            }

            acc[group.regionId].push(group);

            return acc;

        }, {} as Record<UUID, VotingGroup[]>);

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
                        regionGroups={regionGroups} />
                ))}
        </>
    );
}