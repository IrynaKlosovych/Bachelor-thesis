import { useState } from "react";
import { useCountryStore } from "../../store/countryStore";
import styles from "../../styles/country/CountryNameInput.module.css";
interface CountryNameProps {
    id: string;
    label: string;
}

export default function CountryNameInput({ id, label }: CountryNameProps) {
    const updateCountryLabel = useCountryStore(
        (state) => state.updateCountryLabel
    );
    const [value, setValue] = useState(label);
    return (
        <>
            <div>
                <input
                    name={`country_name_${id}`}
                    id={`country_name_${id}`}
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
                <div>
                    <div className={styles.underline}></div>
                </div>
            </div>
        </>
    );
}