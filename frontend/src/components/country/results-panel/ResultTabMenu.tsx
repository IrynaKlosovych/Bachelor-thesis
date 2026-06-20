import { ELECTION_VOTING_SYSTEMS_VISIBLE } from "../../../ui/result-messages";

import styles from "../../../styles/country/results-panel/ResultTabMenu.module.css";
interface ResultTabMenuProps<T extends string> {
    tabs: Record<T, unknown>;
    activeTab: T;
    setActiveTab: (tab: T) => void;
}
export default function ResultTabMenu<T extends string>({ tabs, activeTab, setActiveTab }: ResultTabMenuProps<T>) {
    const tabsKeys = Object.keys(tabs) as T[];
    return (
        <>
            <div className={styles["result-tab-menu"]}>
                {tabsKeys.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${styles["result-tab-button"]} ${activeTab === tab ? styles["active-result-tab-button"] : ""}`}                    >
                        {ELECTION_VOTING_SYSTEMS_VISIBLE[tab as keyof typeof ELECTION_VOTING_SYSTEMS_VISIBLE]}
                    </button>
                ))}
            </div>
        </>
    );
}