import { VOTING_GROUP_SIZE } from "../../../../../constants/voter";
import { useGetPresidentCandidateById } from "../../../../../hooks/candidate/useGetPresidentCandidateById";
import { useGetVoterByVoterId } from "../../../../../hooks/voter/useGetVoterByVoterId";
import type { VoterPresidentialResult } from "../../../../../types/results";

import styles from "../../../../../styles/country/results-panel/ResultMap.module.css";
interface ResultVotingGroupProps {
    typeSystem: string;
    tour_num: number;
    voter: VoterPresidentialResult;
    onHover: (voter: VoterPresidentialResult, e: React.MouseEvent) => void;
    onLeave: () => void;
}
export default function ResultVotingGroup({ typeSystem, tour_num, voter, onHover, onLeave }: ResultVotingGroupProps) {
    const firstVoter = useGetVoterByVoterId(voter.id);
    const candidate = useGetPresidentCandidateById(voter.voting_systems_presidential[typeSystem]?.[`tour_${tour_num}`]);
    if (!firstVoter) return;

    let color;
    let classVoter;
    if (voter.probability_take_part > 60) {
        color = candidate?.color;
        classVoter = "";
    }
    else {
        color = "var(--shifting-sand)";
        classVoter = "no-voting";
    }

    const size = firstVoter.details_descr.peopleCount <= VOTING_GROUP_SIZE.size_44.max_people ? VOTING_GROUP_SIZE.size_44.size : VOTING_GROUP_SIZE.size_60.size;

    return (
        <>
            <g filter={`url(#voter_shadow)`}>
                <circle
                    className={styles[classVoter]}
                    cx={voter.x}
                    cy={voter.y}
                    r={size / 2}
                    fill={color}
                    stroke={"var(--shadow2)"}
                    onMouseEnter={(e) => onHover(voter, e)}
                    onMouseMove={(e) => onHover(voter, e)}
                    onMouseLeave={onLeave}
                />
            </g>
        </>
    );
}