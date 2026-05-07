import { CREATE_COUNTRY_BUTTON_MESSAGE } from "../../ui/messages";
import styles from "../../styles/country/CreateCountryButton.module.css";
export default function CreateCountryButton() {
    return (
        <>
            <button className={styles["create-country"]}>{CREATE_COUNTRY_BUTTON_MESSAGE}
            </button>
        </>
    );
}