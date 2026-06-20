import { useGetPresidentCandidateByCountryId } from "../../../../hooks/candidate/useGetPresidentCandidateByCountryId";
import { useGetRegionsByCountryId } from "../../../../hooks/region/useGetRegionsByCountryId";
import type { UUID } from "../../../../types/general";
import type { VoterPresidentialResult } from "../../../../types/results";

import RegionResultPresidentialTable from "./RegionResultPresidentialTable";

interface ResultPresidentialTableProps {
    countryId: UUID,
    voters_by_regions: Record<UUID, VoterPresidentialResult[]>;
}
export default function ResultPresidentialTable({ countryId, voters_by_regions }: ResultPresidentialTableProps) {
    const regions = useGetRegionsByCountryId(countryId);
    const candidates = useGetPresidentCandidateByCountryId(countryId);
    return (
        <>
            <div>
                {regions.map((region) => (
                    <RegionResultPresidentialTable key={`res_presidential_table_region_${region.id}`}
                    voters={voters_by_regions[region.id]} region={region} candidates={candidates} />
                ))}
            </div>
        </>
    );
}