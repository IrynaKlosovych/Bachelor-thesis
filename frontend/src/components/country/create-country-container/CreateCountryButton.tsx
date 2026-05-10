import { useCountryStore } from "../../../store/countryStore";
import { CREATE_COUNTRY_BUTTON_MESSAGE } from "../../../ui/messages";

import styles from "../../../styles/country/create-country-container/CreateCountryButton.module.css";

export default function CreateCountryButton() {
    const addCountry = useCountryStore(
        (state) => state.addCountry
    );
    return (
        <>
            <button
                className={styles["create-country"]}
                onClick={addCountry}
            >
                {CREATE_COUNTRY_BUTTON_MESSAGE}
            </button>
        </>
    );
}