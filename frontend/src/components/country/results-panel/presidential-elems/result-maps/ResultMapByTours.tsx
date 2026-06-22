import { useState } from "react";

import { COUNTRY_BORDERS } from "../../../../../constants/country_borders";
import { REGIONS_SETTINGS } from "../../../../../constants/region";
import { useGetPresidentCandidateByCountryId } from "../../../../../hooks/candidate/useGetPresidentCandidateByCountryId";
import { useGetRegionsByCountryId } from "../../../../../hooks/region/useGetRegionsByCountryId";
import type { UUID } from "../../../../../types/general";
import type { Region } from "../../../../../types/region";
import type { VoterPresidentialResult } from "../../../../../types/results";
import { TEXT_REGIONS } from "../../../../../ui/region_messages";
import { PEOPLE_COUNT, PROBABILITY_TAKE_PART_TEXT, RESULT_CHART } from "../../../../../ui/result-messages";

import ResultVotingGroup from "./ResultVotingGroup";

import styles from "../../../../../styles/country/results-panel/ResultMap.module.css";

interface ResultMapByToursProps {
    tour_num: number;
    countryId: UUID;
    voters_by_regions: Record<string, VoterPresidentialResult[]>;
    activeTab: string;
    us_like_regions?: Record<UUID, UUID>;
}
export default function ResultMapByTours({ tour_num, countryId, voters_by_regions, activeTab, us_like_regions }: ResultMapByToursProps) {
    const [hoveredVoter, setHoveredVoter] = useState<VoterPresidentialResult | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [peopleCount, setPeopleCount] = useState(0);
    const regions = useGetRegionsByCountryId(countryId);
    const candidates = useGetPresidentCandidateByCountryId(countryId);

    const handleSelectVoter = (peopleCount: number) => {
        setPeopleCount(peopleCount);
    };
    return (
        <>
            <div className={styles["map-tour-container"]}>
                <div>{`${RESULT_CHART.tour} ${tour_num}`}</div>
                <svg width="334" height="423" viewBox="0 0 334 423" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        {regions.map((region: Region) => {
                            const candidateId = us_like_regions?.[region.id];
                            const candidate = candidates.find(c => c.id === candidateId);

                            const fill =
                                activeTab === "us_like" && candidate
                                    ? candidate.color
                                    : "";
                            return (
                                <path
                                    fill={fill}
                                    id={`${region.id}`}
                                    key={region.component_id}
                                    d={REGIONS_SETTINGS[region.regionKeyName].d}
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
                                        key={`result_text_regions_${path.key}_${region.id}`}
                                        d={path.d}
                                        fill="black"
                                    />
                                );
                            })
                        }
                    </g>
                    {Object.values(voters_by_regions).map((voters) =>
                        voters.map((voter) => (
                            <ResultVotingGroup key={`result_voter_${voter.id}`} typeSystem={activeTab} tour_num={tour_num}
                                voter={voter}
                                onActiveVoter={handleSelectVoter}
                                onHover={(v, e) => {
                                    setHoveredVoter(v);
                                    setTooltipPos({ x: e.clientX, y: e.clientY });
                                }}
                                onLeave={() => setHoveredVoter(null)} />
                        )))
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
                {hoveredVoter && (
                    <div style={{
                        left: tooltipPos.x + 10,
                        top: tooltipPos.y + 10
                    }}
                        className={styles["result-voter-popup"]}>
                        <div>{hoveredVoter.name}</div>
                        <div>{PROBABILITY_TAKE_PART_TEXT} {hoveredVoter.probability_take_part.toFixed(2)}%</div>
                        <div>{PEOPLE_COUNT} {peopleCount}</div>
                    </div>
                )}
            </div>
        </>
    );
}