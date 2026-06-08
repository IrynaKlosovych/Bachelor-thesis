import CandidateDeleteButton from "./CandidateDeleteButtton";

import styles from "../../../../styles/country/candidates/elements-profile/CandidateSettingsBlock.module.css";
interface CandidateSettingsBlockProps {
    candidate_color: string;
}
export default function CandidateSettingsBlock({ candidate_color }: CandidateSettingsBlockProps) {
    return (
        <>
            <div className={styles["person-candidate-block-settings"]}>
                <div style={{ background: candidate_color }}
                    className={styles["person-candidate-block-color"]}
                ></div>
                <div>
                    <CandidateDeleteButton />
                </div>
            </div>
        </>
    );
}