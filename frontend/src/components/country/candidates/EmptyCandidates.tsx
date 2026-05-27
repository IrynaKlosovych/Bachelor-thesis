import { NO_CANDIDATES } from "../../../ui/candidate_messages";

import styles from "../../../styles/country/candidates/EmptyCandidates.module.css";
export default function EmptyCandidates() {
    return (
        <div className={styles["no-candidate-block"]}>{NO_CANDIDATES}</div>
    );
}