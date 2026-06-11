import type { VotingSystem, VotingSystemId } from "../../../types/results";
import { ELECTION_VOTING_SYSTEMS_VISIBLE } from "../../../ui/result-messages";

import styles from "../../../styles/country/results-panel/ResultTabMenu.module.css";
interface ResultTabMenuProps {
    tabs: VotingSystem[];
    activeTab: VotingSystemId;
    setActiveTab: (tab: VotingSystemId) => void;
}
export default function ResultTabMenu({ tabs, activeTab, setActiveTab }: ResultTabMenuProps) {
    return (
        <>
            <div className={styles["result-tab-menu"]}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${styles["result-tab-button"]} ${activeTab===tab.id ? styles["active-result-tab-button"] : ""}`}                    >
                        {ELECTION_VOTING_SYSTEMS_VISIBLE[tab.id]}
                    </button>
                ))}
            </div>
        </>
    );
}