import { useState } from "react";

import { COUNTRY_BORDERS } from "../../../constants/country_borders";
import { REGIONS_SETTINGS } from "../../../constants/region";
import { useGetRegionsByCountryId } from "../../../hooks/region/useGetRegionsByCountryId";
import { useGetVotersByCountryId } from "../../../hooks/voter/useGetVotersByCountryId";
import { deleteGroupService } from "../../../services/dataConsistencyVoterService";
import { useRegionStore } from "../../../store/regionStore";
import type { Region } from "../../../types/region";
import { SAFETY_LEVELS } from "../../../types/region";
import type { OpenPopupData, VotingGroup } from "../../../types/voter";
import { CLOSE_CHOOSE_SAFETY_BUTTON_POPUP, TEXT_REGIONS } from "../../../ui/region_messages";
import { TEXT_DELETE_VOTER } from "../../../ui/voter_messages";

import VotingGroupCircle from "./VotingGroupCircle";

import styles from "../../../styles/country/map-container-settings/Map.module.css";

interface MapProps {
    countryId: string;
}
export default function Map({ countryId }: MapProps) {
    const [openedPopup, setOpenedPopup] = useState<OpenPopupData | null>(null);
    const regions = useGetRegionsByCountryId(countryId);
    const voters = useGetVotersByCountryId(countryId);

    const { changeRegionSafetyLevel } = useRegionStore();

    const [selectedRegionId, setSelectedRegionId] =
        useState<string | null>(null);

    return (
        <>
            <svg width="334" height="423" viewBox="0 0 334 423" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    {regions.map((region: Region) => {
                        return (
                            <path
                                className={styles[`safety-level-path-${region.safety_level}`]}
                                id={`${region.id}`}
                                key={region.component_id}
                                d={REGIONS_SETTINGS[region.regionKeyName].d}
                                onClick={() => setSelectedRegionId(region.id)}
                            />
                        );
                    })}
                    <path d={COUNTRY_BORDERS.path6.d} stroke="black" />

                    {
                        TEXT_REGIONS.map((path) => {
                            const region = regions.find((r) => {

                                return r.regionKeyName === path.key;
                            });
                            if (!region) return;
                            return (
                                <path
                                    key={`text_regions_${path.key}_${region.id}`}
                                    d={path.d}
                                    fill="black"
                                    className={
                                        selectedRegionId === region.id
                                            ? styles["active-region"]
                                            : ""
                                    }
                                />
                            );
                        })
                    }
                </g>
                {voters.map((voter: VotingGroup) => (
                    <VotingGroupCircle key={voter.componentId}
                        size={44} voter={voter} regions={regions} onOpenPopup={setOpenedPopup}
                    />
                ))
                }
                <defs>
                    <filter id={`voter_shadow`} x="-4" y="-4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dx="-4" dy="-4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="shape" result={`effect1_innerShadow_44`} />
                    </filter>
                </defs>

            </svg>
            {selectedRegionId && (
                <div className={styles["map-popup-choose-safety"]}>
                    {SAFETY_LEVELS.map((level) => (
                        <button
                            className={`${styles["safety-level-button"]} ${styles[`safety-level-button-${level}`]}`}
                            key={`country_${countryId}_level_${level}`}
                            onClick={() => {
                                changeRegionSafetyLevel(
                                    selectedRegionId,
                                    level
                                );

                                setSelectedRegionId(null);
                            }}
                        >
                            {level}
                        </button>
                    ))}
                    <button
                        className={styles["close-button"]}
                        onClick={() => {
                            setSelectedRegionId(null);
                        }}
                    >
                        {CLOSE_CHOOSE_SAFETY_BUTTON_POPUP}
                    </button>
                </div>
            )}
            {openedPopup && (
                <div className={styles.popup}>
                    <div>
                        <div>{openedPopup.voter.name}</div>
                        <button onClick={() => setOpenedPopup(null)}>
                            {CLOSE_CHOOSE_SAFETY_BUTTON_POPUP}                    </button>
                    </div>

                    <button
                        onClick={() => {
                            deleteGroupService(openedPopup.voter.id);
                            setOpenedPopup(null);
                        }}
                    >
                        {TEXT_DELETE_VOTER}
                    </button>
                </div>
            )}
        </>
    );
};