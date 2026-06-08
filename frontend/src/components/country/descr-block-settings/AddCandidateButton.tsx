import { ELECTION_MODE_SETTINGS } from "../../../constants/country";
import { useGetCountryById } from "../../../hooks/country/useGetCountryById";
import { addPartyCandidateService, addPresidentCandidateService } from "../../../services/dataConsistencyCandidateService";
import { TEXT_ADD_CANDIDATE } from "../../../ui/country_messages";
import Button from "../../Button";

interface AddCandidateButtonProps {
    countryId: string;
}
export default function AddCandidateButton({ countryId }: AddCandidateButtonProps) {
    const country = useGetCountryById(countryId);

    const text_add_candidate =
        country?.electionMode === ELECTION_MODE_SETTINGS.presidential.key
            ? TEXT_ADD_CANDIDATE.person
            : TEXT_ADD_CANDIDATE.party;

    const handleAddCandidate = () => {
        if (!country) return;

        if (country.electionMode === ELECTION_MODE_SETTINGS.presidential.key) {
            addPresidentCandidateService(countryId);
        }
        else {
            addPartyCandidateService(countryId);
        }
    };
    return (
        <>
            <Button
                text={text_add_candidate}
                onClick={handleAddCandidate}>
            </Button>
        </>
    );
}