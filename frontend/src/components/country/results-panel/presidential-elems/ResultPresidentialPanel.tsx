import { useState } from "react";

import { useResultStore } from "../../../../store/resultStore";
import type { UUID } from "../../../../types/general";
import type { PresidentialVotingSystems } from "../../../../types/results";
import ResultTabMenu from "../ResultTabMenu";

import Condorcet from "./result-charts/Condorcet";
import PresidentialCharts from "./result-charts/PresidentialCharts";
import ResultMapContainer from "./result-maps/ResultMapContainer";
import ResultPresidentialTable from "./result-voters-table/ResultPresidentialTable";

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
                {activeTab !== "condorcet" && (
                    <div className={styles["result-map-container"]}>
                        <ResultMapContainer
                            tours_num={Object.keys(votingResults.voting_systems[activeTab]).length}
                            countryId={countryId}
                            voters_by_regions={votingResults.voters_by_regions}
                            activeTab={activeTab as string}
                            us_like_regions={votingResults.other}
                        />
                    </div>
                )}
            </div>
            <div className={styles["result-other-container"]}>
                {activeTab !== "condorcet" ? (
                    <div className={styles["tours"]}>
                        <PresidentialCharts
                            countryId={countryId}
                            type={activeTab}
                            voting_system={votingResults.voting_systems[activeTab]} />
                    </div>
                ) : (<div className={styles["condorcet"]}>
                    <Condorcet countryId={countryId}
                        voting_system={votingResults.voting_systems[activeTab].tour_1}
                    />
                </div>)}
            </div>
        </div>
    );
}