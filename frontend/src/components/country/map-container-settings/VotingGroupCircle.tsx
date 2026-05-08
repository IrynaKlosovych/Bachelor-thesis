type VotingGroupCircleProps = {
    size?: number;
    color: string;
    voting_group_id: string;
};
export default function VotingGroupCircle({ size = 44, color, voting_group_id }: VotingGroupCircleProps) {
    return (
        <>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                xmlns="http://www.w3.org/2000/svg"
            >

                <g filter={`url(#filter0_i_${voting_group_id})`}>

                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={size / 2}
                        fill={color}
                    />
                </g>

                <defs>
                    <filter id={`filter0_i_${voting_group_id}`} x="-4" y="-4" width={size + 4} height={size + 4} filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dx="-4" dy="-4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="shape" result={`effect1_innerShadow_${voting_group_id}`} />
                    </filter>
                </defs>
            </svg>
        </>
    );
}