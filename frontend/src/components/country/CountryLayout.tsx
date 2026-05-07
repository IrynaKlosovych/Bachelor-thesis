import styles from "../../styles/country/CountryLayout.module.css";
import CountryNameInput from "./settings-panel/CountryNameInput";
import CopyCountryButton from "./settings-panel/CopyCountryButton";
import DeleteCountryButton from "./settings-panel/DeleteCountryButton"
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
                        <CopyCountryButton countryId={id}/>
                        <DeleteCountryButton countryId={id}/>
                    </div>
                </div>
            </div>
        </div>
    );
}