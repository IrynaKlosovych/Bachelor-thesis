import { useCountryStore } from "../../../store/countryStore";
import { TEXT_COUNTRY_DESCR } from "../../../ui/messages";

import styles from "../../../styles/country/descr-block-settings/CountryDescr.module.css";

interface CountryDescrProps {
    countryId: string;
}
export default function CountryDescr({ countryId }: CountryDescrProps) {
    const countryDescr = useCountryStore(
        state =>
            state.countries.find(
                country => country.id === countryId
            )?.descr || ""
    );

    const updateCountryDescr = useCountryStore(
        state => state.updateCountryDescr
    );

    return (
        <textarea
            className={styles["country-descr"]}
            placeholder={TEXT_COUNTRY_DESCR}
            name={`country_${countryId}_descr`}
            id={`country_${countryId}_descr`}
            value={countryDescr}
            onChange={(e) =>
                updateCountryDescr(
                    countryId,
                    e.target.value
                )
            }>
        </ textarea>
    );
};