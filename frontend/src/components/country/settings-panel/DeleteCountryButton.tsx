import styles from "../../../styles/country/settings-panel/DeleteCountryButton.module.css";
import { useCountryStore } from "../../../store/countryStore";

type DeleteCountryButtonProps = {
    countryId: string;
};

export default function DeleteCountryButton({ countryId }: DeleteCountryButtonProps) {
    const deleteCountry = useCountryStore(
        (state) => state.deleteCountry
    );
    return (
        <button className={styles["delete-button"]}
            onClick={() => deleteCountry(countryId)}>
            <svg
                className={styles["delete-icon"]}
                viewBox="0 0 87 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect className={styles["icon-bg"]} width="88" height="100" />
                <path
                    className={styles["icon-shape"]}
                    d="M52 44V64H36V44H52ZM49 32H39L37 34H30V38H58V34H51L49 32ZM56 40H32V64C32 66.2 33.8 68 36 68H52C54.2 68 56 66.2 56 64V40Z"
                />
            </svg>
        </button>
    );
}