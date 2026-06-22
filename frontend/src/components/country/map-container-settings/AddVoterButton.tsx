import { useState } from "react";

import { addGroupService } from "../../../services/dataConsistencyVoterService";

import styles from "../../../styles/country/map-container-settings/AddVoterButton.module.css";
interface addGroup {
    countryId: string;
}
export default function AddVoterButton({ countryId }: addGroup) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={styles["button-add-voter"]}
            onClick={() => addGroupService(countryId)}
        >

            <svg
                width="88"
                height="100"
                viewBox="0 0 88 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {isHovered ? (
                    <>
                        <path
                            d="M86 2V56C86 79.196 67.196 98 44 98H2V2H86Z"
                            fill="var(--peach-dust)"
                        />
                        <path
                            d="M86 2V56C86 79.196 67.196 98 44 98H2V2H86Z"
                            stroke="var(--rose-brown)"
                            strokeWidth="4"
                        />
                        <path
                            d="M58 52H46V64H42V52H30V48H42V36H46V48H58V52Z"
                            fill="var(--rose-brown)"
                        />
                    </>
                ) : (
                    <>
                        <path
                            d="M0 0H88V56C88 80.3005 68.3005 100 44 100H0V0Z"
                            fill="var(--rose-brown)"
                        />
                        <path
                            d="M58 52H46V64H42V52H30V48H42V36H46V48H58V52Z"
                            fill="var(--peach-dust)"
                        />
                    </>
                )}
            </svg>
        </button>
    );
}