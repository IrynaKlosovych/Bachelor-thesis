import { CANDIDATE_SETTINGS } from "../../../../../constants/candidate";
import type { PartyCandidateComponentId, PersonCandidateComponentId } from "../../../../../types/candidate";
import { TEXT_CANDIDATES } from "../../../../../ui/candidate_messages";

import MediaInputBlock from "./MediaInputBlock";
import MediaRangeBlock from "./MediaRangeBlock";
import MediaTextSpan from "./MediaTextSpan";

import styles from "../../../../../styles/country/candidates/elements-profile/media-rating-blocks/CandidateMediaBlock.module.css";
interface CandidateMediaBlockProps {
    candidate_media_text: string;
    candidate_componentId: PersonCandidateComponentId | PartyCandidateComponentId;
    candidate_media_negative: number;
    candidate_media_positive: number;
    classes: string[];
    onChange: (value: string) => void;
}
export default function CandidateMediaBlock({ candidate_media_text, classes, candidate_componentId, candidate_media_negative, candidate_media_positive, onChange }: CandidateMediaBlockProps) {
    return (
        <>
            <div className={classes.map(c => styles[c]).join(" ")}>
                <div>{candidate_media_text}</div>
                <div>
                    <div className={styles["negative-block"]}>
                        <MediaTextSpan
                            media_type={TEXT_CANDIDATES.media.negative}
                            percentage={TEXT_CANDIDATES.media.here_is_100_percentage}>
                        </MediaTextSpan>
                        <MediaInputBlock
                            classes={["candidate-media-number-block"]}
                            name={`${candidate_componentId}_neg`}
                            id={`${candidate_componentId}_neg`}
                            min={CANDIDATE_SETTINGS.min_media}
                            max={CANDIDATE_SETTINGS.max_madia}
                            value={candidate_media_negative}
                        ></MediaInputBlock>
                    </div>
                    <div className={styles["positive-block"]}>
                        <MediaInputBlock
                            classes={["candidate-media-number-block"]}
                            name={`${candidate_componentId}_pos`}
                            id={`${candidate_componentId}_pos`}
                            min={CANDIDATE_SETTINGS.min_media}
                            max={CANDIDATE_SETTINGS.max_madia}
                            value={candidate_media_positive}
                        >
                        </MediaInputBlock>
                        <MediaTextSpan
                            media_type={TEXT_CANDIDATES.media.positive}
                            percentage={TEXT_CANDIDATES.media.here_is_100_percentage}>
                        </MediaTextSpan>
                    </div>
                </div>
                <MediaRangeBlock
                    name={`${candidate_componentId}_range_media`}
                    id={`${candidate_componentId}_range_media`}
                    value={candidate_media_positive}
                    min={CANDIDATE_SETTINGS.min_media}
                    max={CANDIDATE_SETTINGS.max_madia}
                    onChange={onChange}>
                </MediaRangeBlock>
            </div>
        </>
    );
}