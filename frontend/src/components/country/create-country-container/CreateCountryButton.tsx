import { addCountryService } from "../../../services/dataConsistencyCountryService";
import { CREATE_COUNTRY_BUTTON_MESSAGE } from "../../../ui/country_messages";

import styles from "../../../styles/country/create-country-container/CreateCountryButton.module.css";

export default function CreateCountryButton() {
    return (
        <>
            <button
                className={styles["create-country"]}
                onClick={addCountryService}
            >
                {CREATE_COUNTRY_BUTTON_MESSAGE}
            </button>
        </>
    );
}