import type { UUID } from "../../../../types/general";

import { TourChart } from "./TourChart";

interface PresidentialChartsProps {
    countryId: UUID;
    type: string;
    voting_system?: Record<string, Record<string, number>>;
}
export default function PresidentialCharts({ countryId, type, voting_system }: PresidentialChartsProps) {
    if (!voting_system) return null;

    return (
        <>
            {Object.entries(voting_system).map(([tourName, results]) => (
                <div>
                    <TourChart countryId={countryId} type={type}
                        key={tourName} tourName={tourName} results={results} />
                </div>
            ))}
        </>
    );
}