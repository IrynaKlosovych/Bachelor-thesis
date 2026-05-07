import { useState } from "react";
import { useCountryStore } from "../../store/countryStore";
import { safetyColors } from "../../types/country";
import { SAFETY_LEVELS } from "../../types/country";
import { CountryBorders } from "../../constants/country_borders";

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

                {/* <path d="" fill="#EE6E8B" />
            <path d="" fill="#C9D3C0" /> */}
                <path d={CountryBorders.path1.d} stroke="black" />
                <path d={CountryBorders.path2.d} fill="black" />
                <path d={CountryBorders.path3.d} fill="black" />
                <path d={CountryBorders.path4.d} fill="black" />
                <path d={CountryBorders.path5.d} fill="black" />
                <path d={CountryBorders.path6.d} fill="black" />
            </svg>
            {selectedRegionId && (
                <div
                    style={{
                        position: "fixed",
                        top: "0%",
                        left: "50%",
                        transform: "translate(-50%, 0%)",
                        background: "white",
                        padding: "20px",
                        borderRadius: "12px",
                        border: "1px solid black",
                        display: "flex",
                        gap: "10px",
                        zIndex: 1000,
                    }}
                >
                    {SAFETY_LEVELS.map((level) => (
                        <button
                            key={level}
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
                        onClick={() => {
                            setSelectedRegionId(null);
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
        </>
    );
};