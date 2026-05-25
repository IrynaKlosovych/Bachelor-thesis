import CountryPaginationContainer from "./CountryPaginationContainer";
import CreateCountryButton from "./CreateCountryButton";

import styles from "../../../styles/country/create-country-container/CreateCountryButtonContainer.module.css";

export default function CreateCountryButtonContainer() {
    return (
        <>
            <div className={styles["button-create-country-container"]}>
                <div>
                    <div>
                        <CreateCountryButton></CreateCountryButton>
                    </div>
                    <div>
                        <CountryPaginationContainer></CountryPaginationContainer>
                    </div>
                </div>
            </div>
        </>
    );
}