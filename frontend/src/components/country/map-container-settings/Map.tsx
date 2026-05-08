import { useState } from "react";
import { useCountryStore } from "../../../store/countryStore";
import { safetyColors, SAFETY_LEVELS } from "../../../types/country";
import { CLOSE_CHOOSE_SAFETY_BUTTON_POPUP, textRegions } from "../../../ui/messages";
import { CountryBorders } from "../../../constants/country_borders";
import styles from "../../../styles/country/map-container-settings/Map.module.css";
import VotingGroupCircle from "./VotingGroupCircle";

interface MapProps {
    countryId: string;
}
export default function Map({ countryId }: MapProps) {
    const country = useCountryStore((state) =>
        state.countries.find((country) => country.id === countryId)
    );
    if (!country) {
        return null;
    }

    const changeRegionSafetyLevel = useCountryStore(
        (state) => state.changeRegionSafetyLevel
    );

    const [selectedRegionId, setSelectedRegionId] =
        useState<string | null>(null);

    const regionIds = Object.fromEntries(
        Object.entries(country.regions).map(([key, region]) => [
            key,
            region.id
        ])
    );

    return (
        <>
            <svg width="334" height="423" viewBox="0 0 334 423" fill="none" xmlns="http://www.w3.org/2000/svg">
                {Object.values(country.regions).map((region) => (
                    <path
                        key={region.component_id}
                        d={region.d}
                        fill={safetyColors[region.safety_level]}
                        onClick={() => setSelectedRegionId(region.id)}
                    />
                ))}
                <path d={CountryBorders.path6.d} stroke="black" />

                {textRegions.map((path) => (
                    <path
                        key={`text_regions_${path.key}_${regionIds[path.key]}`}
                        d={path.d}
                        fill="black"
                        className={
                            selectedRegionId === regionIds[path.key]
                                ? styles["active-region"]
                                : ""
                        }
                    />
                ))}
                <VotingGroupCircle size={44} color="#123456" voting_group_id="123" />
            </svg>
            {selectedRegionId && (
                <div className={styles["map-popup-choose-safety"]}>
                    {SAFETY_LEVELS.map((level) => (
                        <button
                            className={`${styles["safety-level-button"]} ${styles[`safety-level-${level}`]}`}
                            key={`country_${countryId}__level_${level}`}
                            onClick={() => {
                                changeRegionSafetyLevel(
                                    countryId,
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
        </>
    );
};