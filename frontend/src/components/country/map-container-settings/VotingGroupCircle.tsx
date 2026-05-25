import { useRef, useState } from "react";

import { MAP_HEIGHT, MAP_WIDTH } from "../../../constants/map";
import { STAGE_FILLED_COLORS } from "../../../constants/voter";
import { updateVotingGroupPositionService } from "../../../services/dataConsistencyVoterService";
import type { Region } from "../../../types/region";
import type { OpenPopupData, VotingGroup } from "../../../types/voter";

import styles from "../../../styles/country/map-container-settings/VotingGroupCircle.module.css";

type VotingGroupCircleProps = {
    size?: number;
    voter: VotingGroup;
    regions: Region[];
    onOpenPopup: (data: OpenPopupData) => void;
};

export default function VotingGroupCircle({ size = 44, voter, regions, onOpenPopup }: VotingGroupCircleProps) {
    const [isDraggingStyles, setIsDraggingStyles] = useState(false);
    const isDragging = useRef(false);
    const moved = useRef(false);

    const handlePointerDown = () => {
        isDragging.current = true;
        moved.current = false;
        setIsDraggingStyles(true);
    };

    const handlePointerUp = () => {
        isDragging.current = false;
        setIsDraggingStyles(false);
        if (!moved.current) {
            onOpenPopup({
                voter,
            });
        }
    };

    const handlePointerMove = (
        e: React.PointerEvent<SVGCircleElement>
    ) => {

        if (!isDragging.current) return;
        moved.current = true;

        const svg = e.currentTarget.ownerSVGElement;

        if (!svg) return;

        const point = svg.createSVGPoint();

        point.x = e.clientX;
        point.y = e.clientY;

        const transformedPoint = point.matrixTransform(
            svg.getScreenCTM()?.inverse()
        );

        const x = Math.max(
            size / 2,
            Math.min(
                MAP_WIDTH - size / 2,
                transformedPoint.x
            )
        );

        const y = Math.max(
            size / 2,
            Math.min(
                MAP_HEIGHT - size / 2,
                transformedPoint.y
            )
        );

        const svgPoint = svg.createSVGPoint();

        svgPoint.x = x;
        svgPoint.y = y;

        const region = regions.find((region) => {

            const element = document.getElementById(
                `${region.id}`
            ) as SVGPathElement | null;

            if (!element) return false;

            return element.isPointInFill(svgPoint);
        });

        if (!region) return;

        updateVotingGroupPositionService(
            voter.id,
            x,
            y,
            region.id
        );
    };
    const color = STAGE_FILLED_COLORS[voter.stageFilled];
    return (
        <>
            <g filter={`url(#voter_shadow)`}>
                <circle
                    cx={voter.x}
                    cy={voter.y}
                    r={size / 2}
                    fill={color}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerMove={handlePointerMove}
                    className={isDraggingStyles
                        ? styles["voting-circle-grabbing"]
                        : styles["voting-circle"]}
                />
            </g>
        </>
    );
}