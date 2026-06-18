import { useResultStore } from "../../../store/resultStore";
import type { Country } from "../../../types/country";
import type { VotingSystemId } from "../../../types/results";
import { TEXT_SEND_DATA_TO_SERVER } from "../../../ui/country_messages";
import Button from "../../Button";
interface SendButtonProps {
    country: Country;
    handleSend:()=>void
}
export default function SendButton({ country }: SendButtonProps) {
    const setResults = useResultStore(state => state.setResults);

    const handleSend = () => {
        /* test data */
        const results = {
            country: {
                id: country.id,
                componentId: country.componentId,
                label: country.label,
                electionMode: country.electionMode
            },
            voting_systems: [
                { id: "fptp" as VotingSystemId },
                { id: "trs" as VotingSystemId },
                { id: "us_like" as VotingSystemId },
                { id: "rcv" as VotingSystemId },
                { id: "condorcet" as VotingSystemId },
            ]
        };
        setResults(country.id, country.electionMode, results);
    };
    return (
        <>
            <Button
                text={TEXT_SEND_DATA_TO_SERVER}
                onClick={handleSend}>
            </Button>
        </>
    );
}