import { useState } from "react";

import { ELECTION_MODE_SETTINGS } from "../../../constants/constants";
import { useCountryStore } from "../../../store/countryStore";
import type { ElectionMode } from "../../../types/country";
import { TEXT_MODE_TO_CHOOSE } from "../../../ui/messages";

import styles from "../../../styles/country/descr-block-settings/ElectionModeChoosen.module.css";
interface ElectionModeChoosenProps {
    countryId: string;
}
export default function ElectionModeChoosen({ countryId }: ElectionModeChoosenProps) {
    const [isOpen, setIsOpen] = useState(false);
    const country = useCountryStore(
        state => state.countries.find(c => c.id === countryId)
    );

    const changeElectionMode = useCountryStore(
        state => state.changeElectionMode
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        changeElectionMode(
            countryId,
            e.target.value as ElectionMode
        );
    };
    return (
        <>
            <div className={styles["election-mode-block"]}>
                <div>{TEXT_MODE_TO_CHOOSE}</div>
                <select
                    name={`country_${countryId}_election-mode-block`}
                    id={`country_${countryId}_election-mode-block`}
                    className={`${isOpen ? styles.open : ""}`}
                    value={country?.electionMode}
                    onChange={handleChange}
                    onFocus={() => {
                        setIsOpen(true);
                    }}
                    onBlur={() => {
                        setIsOpen(false);
                    }}
                >

                    {Object.values(ELECTION_MODE_SETTINGS).map((mode) => (
                        <option
                            key={`country_${countryId}_mode_${mode.key}`}
                            value={mode.key}
                            onClick={() => setIsOpen(false)}
                        >
                            {mode.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}