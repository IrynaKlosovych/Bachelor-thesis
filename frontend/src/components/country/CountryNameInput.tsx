import { useState } from "react";
import { useCountryStore } from "../../store/countryStore";
import styles from "../../styles/country/CountryLayout.module.css";

interface CountryNameProps {
    id: string;
    label: string;
}

export default function CountryNameInput({id, label}:CountryNameProps) {
    const updateCountryLabel = useCountryStore(
        (state) => state.updateCountryLabel
    );
    const [value, setValue] = useState(label);
    return (
        <input
            className={styles["country-name"]}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
                const trimmed = value.trim();

                if (trimmed === "") {
                    setValue(label);
                    return;
                }

                updateCountryLabel(id, trimmed);
            }}
        />
    );
}