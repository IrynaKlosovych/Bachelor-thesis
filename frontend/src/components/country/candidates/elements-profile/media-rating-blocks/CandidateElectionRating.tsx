import { CANDIDATE_SETTINGS } from "../../../../../constants/candidate";
import type { PartyCandidateComponentId,PersonCandidateComponentId } from "../../../../../types/candidate";
import { TEXT_CANDIDATES } from "../../../../../ui/candidate_messages";

import MediaInputBlock from "./MediaInputBlock";
import MediaRangeBlock from "./MediaRangeBlock";

import styles from "../../../../../styles/country/candidates/elements-profile/media-rating-blocks/CandidateElectionRating.module.css";
interface CandidateElectionRatingProps {
    classes: string[];
    candidate_componentId: PersonCandidateComponentId | PartyCandidateComponentId;
    candidate_election_rating: number;
    onChange: (value: string) => void;
}
export default function CandidateElectionRating({ classes, candidate_componentId, candidate_election_rating, onChange }: CandidateElectionRatingProps) {
    return (
        <>
            <div className={classes.map(c => styles[c]).join(" ")}>
                <div>
                    <div>{TEXT_CANDIDATES.election_rating_text}</div>

                    <MediaInputBlock
                        classes={[""]}
                        name={`${candidate_componentId}_rating`}
                        id={`${candidate_componentId}_rating`}
                        min={CANDIDATE_SETTINGS.min_rating}
                        max={CANDIDATE_SETTINGS.max_rating}
                        value={candidate_election_rating}
                    ></MediaInputBlock>
                </div>
                <MediaRangeBlock
                    name={`${candidate_componentId}_range_rating`}
                    id={`${candidate_componentId}_range_rating`}
                    min={CANDIDATE_SETTINGS.min_rating}
                    max={CANDIDATE_SETTINGS.max_rating}
                    value={candidate_election_rating}
                    onChange={onChange}>
                </MediaRangeBlock>
            </div>
        </>
    );
}