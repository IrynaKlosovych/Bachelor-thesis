import { useGetPagination } from "../../../hooks/country/useGetPagination";
import { nextCountryService, prevCountryService } from "../../../services/dataConsistencyCountryService";

import styles from "../../../styles/country/create-country-container/CountryPaginationContainer.module.css";

export default function CountryPaginationContainer() {
    const { resIndex, length } = useGetPagination();
    return (
        <>
            <button
                className={styles["prev-country"]}
                onClick={prevCountryService}>
            </button>
            <div
                className={styles["number-block"]}>
                <span>{resIndex}</span>
                <span>/</span>
                <span>{length}</span>
            </div>
            <button
                className={styles["next-country"]}
                onClick={nextCountryService}>
            </button>
        </>
    );
}