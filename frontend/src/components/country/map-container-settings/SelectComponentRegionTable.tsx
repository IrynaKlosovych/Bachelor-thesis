import { useState } from "react";

import styles from "../../../styles/country/map-container-settings/RegionTable.module.css";

interface SelectComponentRegionTableProps {
    id: string;
    value: string;
    defaultMessage: string;
    variants: Record<string, string>;
    onChange: (value: string) => void;
}

export default function SelectComponentRegionTable({ id, value, defaultMessage, variants, onChange, }: SelectComponentRegionTableProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <select
            id={id}
            name={id}
            className={`${styles.select} ${isOpen ? styles.open : ""}`}

            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
        >

            <option value="" disabled hidden onClick={() => setIsOpen(false)}>
                {defaultMessage}
            </option>

            {Object.entries(variants).map(([key, label]) => (
                <option key={id + `_v_${key}`} value={label} onClick={() => setIsOpen(false)}>
                    {label}
                </option>
            ))}

        </select>
    );
}