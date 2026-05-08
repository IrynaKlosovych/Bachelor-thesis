import type { VotingGroup } from "../../../types/country";

type VotingGroupCircleProps = {
    size?: number;
    color: string;
    voter:VotingGroup
};
export default function VotingGroupCircle({ size = 44, color, voter}: VotingGroupCircleProps) {
    return (
        <>
            <g filter={`url(#voter_shadow)`}>
                <circle
                    cx={voter.x}
                    cy={voter.y}
                    r={size / 2}
                    fill={color}
                />
            </g>
        </>
    );
}