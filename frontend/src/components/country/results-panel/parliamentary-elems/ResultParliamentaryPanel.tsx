import type { UUID } from "../../../../types/general";

interface ResultParliamentaryPanelProps {
    countryId: UUID;
}
export default function ResultParliamentaryPanel({ countryId }: ResultParliamentaryPanelProps) {
    console.log(countryId);
    return (
        <></>
    );
}