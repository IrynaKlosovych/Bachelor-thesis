import AddVoterButton from "./map-container-settings/AddVoterButton";
import Map from "./map-container-settings/Map";
import VotersTable from "./map-container-settings/VotersTable"
import CopyCountryButton from "./settings-panel/CopyCountryButton";
import CountryNameInput from "./settings-panel/CountryNameInput";
import DeleteCountryButton from "./settings-panel/DeleteCountryButton";

import styles from "../../styles/country/CountryLayout.module.css";
interface CountryLayoutProps {
    id: string;
    label: string;
}

export default function CountryLayout({ id, label }: CountryLayoutProps) {

    return (
        <div
            className={styles['country-template']}>
            <div>
                <div className={styles['country-settings-panel']}>
                    <div>
                        <CountryNameInput id={id} label={label} />
                    </div>
                    <div>
                        <CopyCountryButton countryId={id} />
                        <DeleteCountryButton countryId={id} />
                    </div>
                </div>
                <div className={styles["map-container-settings"]}>
                    <div className={styles['map-voters-container']}>
                        <div>
                            <div><AddVoterButton countryId={id}/></div>
                            <div><Map countryId={id}></Map></div>
                        </div>
                    </div>
                    <div className={styles["voters-params-table-container"]}>
                        <div>
                            <VotersTable countryId={id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}