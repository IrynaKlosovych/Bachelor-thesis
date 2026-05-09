import { useRef } from "react";
import { useCountryStore } from "../../../store/countryStore";
import type { VotingGroup, Region } from "../../../types/country";

type VotingGroupCircleProps = {
    size?: number;
    color: string;
    voter: VotingGroup;
    regions: Region[];

};
const MAP_WIDTH = 334;
const MAP_HEIGHT = 423;
export default function VotingGroupCircle({ size = 44, color, voter, regions, }: VotingGroupCircleProps) {
    const updateVotingGroupPosition = useCountryStore(
        (state) => state.updateVotingGroupPosition
    );

    const isDragging = useRef(false);

    const handlePointerDown = () => {
        isDragging.current = true;
    };

    const handlePointerUp = () => {
        isDragging.current = false;
    };

    const handlePointerMove = (
        e: React.PointerEvent<SVGCircleElement>
    ) => {

        if (!isDragging.current) return;

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

        updateVotingGroupPosition(
            voter.id,
            x,
            y,
            region.id
        );
    };
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
                    style={{
                        cursor: "grab",
                    }}
                />
            </g>
        </>
    );
}