import { NO_RESULTS_YET } from "../../../ui/result-messages";

import styles from "../../../styles/country/results-panel/NoResultYet.module.css";
export default function NoResultYet() {
    return (
        <>
            <div className={styles["no-result-yet"]}>{NO_RESULTS_YET}</div>
        </>
    );
}