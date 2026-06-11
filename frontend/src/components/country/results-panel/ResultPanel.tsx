import { useState } from "react";

import { useResultStore } from "../../../store/resultStore";
import type { ElectionMode } from "../../../types/country";
import type { UUID } from "../../../types/general";

import ResultTabMenu from "./ResultTabMenu";

import styles from "../../../styles/country/results-panel/ResultPanel.module.css";
interface ResultPanelProps {
    countryId: UUID;
    electionMode: ElectionMode;
}
export default function ResultPanel({ countryId, electionMode }: ResultPanelProps) {
    const getResults = useResultStore(state => state.getResults);

    const votingResults = getResults(countryId, electionMode);
    const [activeTab, setActiveTab] = useState(votingResults.voting_systems[0].id);

    return (
        <div className={styles["result-panel"]}>
            <div className={styles["result-tables-container"]}
            >/*tables*/</div>
            <div className={styles["result-tab-menu-container"]}>
                <div>
                    <ResultTabMenu tabs={votingResults.voting_systems}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    ></ResultTabMenu>
                </div>
                <div>/*country/parliament*/</div>
            </div>
            <div className={styles["result-other-container"]}>
                <div>/*chart*/</div>
                <div>/*comments + other*/</div>
            </div>
        </div>
    );
}