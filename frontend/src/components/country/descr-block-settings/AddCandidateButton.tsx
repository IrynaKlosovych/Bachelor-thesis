import { TEXT_ADD_CANDIDATE } from "../../../ui/messages";

import styles from "../../../styles/country/descr-block-settings/AddCandidateButton.module.css";

interface AddCandidateButtonProps {
    countryId: string;
}
export default function AddCandidateButton({ countryId }: AddCandidateButtonProps) {
    return (
        <>
            <div className={styles["add-candidate-block"]}>
                <button className={styles["add-candidate"]}>{TEXT_ADD_CANDIDATE}</button>
                <div className={styles["add-candidate-blur-1"]}></div>
                <div className={styles["add-candidate-blur-2"]}></div>
            </div>
        </>
    );
}