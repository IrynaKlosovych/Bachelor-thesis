import styles from "../../styles/country/CreateCountryButtonContainer.module.css";

import CreateCountryButton from "./CreateCountryButton";

export default function CreateCountryButtonContainer() {
    return (
        <>
            <div className={styles["button-create-country-container"]}>
                <div>
                    <div>
                        <CreateCountryButton></CreateCountryButton>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    );
}