import styles from "../../styles/country/CountryLayout.module.css";
import CountryNameInput from "./CountryNameInput";
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
                    <div className={styles.wrapper}>
                        <CountryNameInput id={id} label={label}/>
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}