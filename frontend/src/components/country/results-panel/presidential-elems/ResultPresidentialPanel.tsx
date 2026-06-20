import { useState } from "react";

import { useResultStore } from "../../../../store/resultStore";
import type { UUID } from "../../../../types/general";
import type { PresidentialVotingSystems } from "../../../../types/results";
import ResultTabMenu from "../ResultTabMenu";

import PresidentialCharts from "./PresidentialCharts";
import ResultPresidentialTable from "./ResultPresidentialTable";

import styles from "../../../../styles/country/results-panel/ResultPanel.module.css";
interface ResultPresidentialPanelProps {
    countryId: UUID;
}
export default function ResultPresidentialPanel({ countryId }: ResultPresidentialPanelProps) {
    const getPresidentialResults = useResultStore(state => state.getPresidentialResults);

    const votingResults = getPresidentialResults(countryId);
    const firstKey = Object.keys(votingResults.voting_systems)[0] as keyof PresidentialVotingSystems;

    const [activeTab, setActiveTab] = useState<keyof PresidentialVotingSystems>(firstKey);

    return (
        <div className={styles["result-panel"]}>
            <div className={styles["result-tables-container"]}
            >
                <ResultPresidentialTable countryId={countryId} voters_by_regions={votingResults.voters_by_regions} />
            </div>
            <div className={styles["result-tab-menu-container"]}>
                <div>
                    <ResultTabMenu tabs={votingResults.voting_systems}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    ></ResultTabMenu>
                </div>
                <div>

                </div>
            </div>
            <div className={styles["result-other-container"]}>
                {activeTab !== "condorcet" ? (
                    <div className={styles["tours"]}>
                        <PresidentialCharts
                            countryId={countryId}
                            type={activeTab}
                            voting_system={votingResults.voting_systems[activeTab]} />
                    </div>
                ) : (<div>

                </div>)}
            </div>
        </div>
    );
}