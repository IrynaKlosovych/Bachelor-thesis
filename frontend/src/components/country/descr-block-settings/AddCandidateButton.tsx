import { ELECTION_MODE_SETTINGS } from "../../../constants/constants";
import { useCountryStore } from "../../../store/countryStore";
import { TEXT_ADD_CANDIDATE } from "../../../ui/messages";

import styles from "../../../styles/country/descr-block-settings/AddCandidateButton.module.css";

interface AddCandidateButtonProps {
    countryId: string;
}
export default function AddCandidateButton({ countryId }: AddCandidateButtonProps) {

    const countries = useCountryStore(
        (state) => state.countries
    );

    const addPresidentCandidate = useCountryStore(
        (state) => state.addPresidentCandidate
    );

    const country = countries.find(
        (c) => c.id === countryId
    );

    const handleAddCandidate = () => {
        if (!country) return;

        if (country.electionMode === ELECTION_MODE_SETTINGS.presidential.key) {
            addPresidentCandidate(countryId);
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