import type { UUID } from "../../../../../types/general";
import type { VoterPresidentialResult } from "../../../../../types/results";

import ResultMapByTours from "./ResultMapByTours";

interface ResultMapContainerProps {
    tours_num: number;
    countryId: UUID;
    voters_by_regions: Record<string, VoterPresidentialResult[]>;
    activeTab: string;
    us_like_regions?: Record<UUID, UUID>;
}
export default function ResultMapContainer({ tours_num, countryId, voters_by_regions, activeTab, us_like_regions }: ResultMapContainerProps) {
    return (
        <>
            {Array.from({ length: tours_num }).map((_, i) => (
                <ResultMapByTours key={`result_map_${activeTab}_${i + 1}`} tour_num={i + 1} countryId={countryId}
                    voters_by_regions={voters_by_regions} activeTab={activeTab}
                    us_like_regions={us_like_regions} />
            ))}
        </>
    );
}