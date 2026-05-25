import { ELECTION_MODE_SETTINGS } from "../../../constants/country";
import { useGetCountryById } from "../../../hooks/country/useGetCountryById";
import { addPresidentCandidateService } from "../../../services/dataConsistencyCandidateService";
import { TEXT_ADD_CANDIDATE } from "../../../ui/country_messages";

import styles from "../../../styles/country/descr-block-settings/AddCandidateButton.module.css";

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
            <div className={styles["add-candidate-block"]}>
                <button className={styles["add-candidate"]}
                    onClick={handleAddCandidate}>{TEXT_ADD_CANDIDATE}</button>
                <div className={styles["add-candidate-blur-1"]}></div>
                <div className={styles["add-candidate-blur-2"]}></div>
            </div>
        </>
    );
}