import { copyCountryService } from "../../../services/dataConsistencyCountryService";

import styles from "../../../styles/country/settings-panel/CopyCountryButton.module.css";
interface CopyCountryButtonProps {
    countryId: string;
}
export default function CopyCountryButton({ countryId }: CopyCountryButtonProps) {

    return (
        <button className={styles["copy-button"]}
            onClick={() => copyCountryService(countryId)}
        >
            <svg
                className={styles["copy-icon"]}
                viewBox="0 0 88 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect className={styles["icon-bg"]} width="88" height="100" />
                <path
                    className={styles["icon-shape"]}
                    d="M52 28H28C25.8 28 24 29.8 24 32V60H28V32H52V28ZM58 36H36C33.8 36 32 37.8 32 40V68C32 70.2 33.8 72 36 72H58C60.2 72 62 70.2 62 68V40C62 37.8 60.2 36 58 36ZM58 68H36V40H58V68Z"
                />
            </svg>
        </button>
    );
}