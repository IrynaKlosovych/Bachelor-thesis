import { ELECTION_MODE_SETTINGS } from "../../../constants/country";
import { useGetCountryById } from "../../../hooks/country/useGetCountryById";
import { addPresidentCandidateService } from "../../../services/dataConsistencyCandidateService";
import { TEXT_ADD_CANDIDATE } from "../../../ui/country_messages";
import Button from "../../Button";

interface AddCandidateButtonProps {
    countryId: string;
}
export default function AddCandidateButton({ countryId }: AddCandidateButtonProps) {
    const country = useGetCountryById(countryId);

    const handleAddCandidate = () => {
        if (!country) return;

        if (country.electionMode === ELECTION_MODE_SETTINGS.presidential.key) {
            addPresidentCandidateService(countryId);
        }
    };
    return (
        <>
            <Button
                text={TEXT_ADD_CANDIDATE}
                onClick={handleAddCandidate}>
            </Button>
        </>
    );
}