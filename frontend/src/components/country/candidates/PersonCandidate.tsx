import { useState } from "react";

import { CANDIDATE_SETTINGS } from "../../../constants/constants";
import { useCountryStore } from "../../../store/countryStore";
import type { PersonCandidate } from "../../../types/country";
import { TEXT_CANDIDATES } from "../../../ui/messages";

import CandidateDeleteButton from "./CandidateDeleteButtton";

import styles from "../../../styles/country/candidates/PersonCandidate.module.css";

interface PersonCandidateProps {
    candidate: PersonCandidate;
}
export default function PersonCandidate({ candidate, }: PersonCandidateProps) {
    const [negativeMedia, setNegativeMedia] = useState(candidate.media.negative);
    const [positiveMedia, setPositiveMedia] = useState(candidate.media.positive);

    const [rating, setRating] = useState(candidate.election_rating);
    const updatePresidentCandidate =
        useCountryStore(
            (state) => state.updatePresidentCandidate
        );

    return (
        <>
            <div className={styles["person-candidate-block"]}>
                <div className={styles["person-candidate-block-settings"]}>
                    <div style={{ background: candidate.color }}
                        className={styles["person-candidate-block-color"]}
                    ></div>
                    <div>
                        <CandidateDeleteButton />
                    </div>
                </div>
                <div>
                    <input
                        name={`country_${candidate.countryId}_candidate_${candidate.id}_name`}
                        id={`country_${candidate.countryId}_candidate_${candidate.id}_name`}
                        className={styles["candidate-name"]}
                        type="text"
                        value={candidate.name}
                        placeholder={TEXT_CANDIDATES.person_candidate_name_text}
                        onChange={(e) =>
                            updatePresidentCandidate(candidate.id, {
                                name: e.target.value,
                            })
                        } />
                </div>
                <div><textarea
                    name={`country_${candidate.countryId}_candidate_${candidate.id}_experience`}
                    id={`country_${candidate.countryId}_candidate_${candidate.id}_experience`}
                    value={candidate.experience}
                    className={styles["candidate-experience"]}
                    placeholder={TEXT_CANDIDATES.person_candidate_descr_text}
                    onChange={(e) =>
                        updatePresidentCandidate(candidate.id, {
                            experience: e.target.value,
                        })
                    }>
                </textarea>
                </div>
                <div>
                    <textarea
                        name={`country_${candidate.countryId}_candidate_${candidate.id}_promise`}
                        id={`country_${candidate.countryId}_candidate_${candidate.id}_promise`}
                        className={styles["candidate-promise"]}
                        placeholder={TEXT_CANDIDATES.candidate_promis}
                        value={candidate.promise}
                        onChange={(e) =>
                            updatePresidentCandidate(candidate.id, {
                                promise: e.target.value,
                            })
                        }>
                    </textarea>
                </div>
                <div className={styles["candidate-media"]}>
                    <div>{TEXT_CANDIDATES.media.text}</div>
                    <div>
                        <div className={styles["negative-block"]}>
                            <div>
                                <span>
                                    {TEXT_CANDIDATES.media.negative}
                                    <br />
                                    {TEXT_CANDIDATES.media.here_is_100_percentage}
                                </span>
                            </div>
                            <div className={styles["candidate-media-number-block"]}>
                                <input
                                    name={`country_${candidate.countryId}_candidate_${candidate.id}_neg`}
                                    id={`country_${candidate.countryId}_candidate_${candidate.id}_neg`}
                                    type="text"
                                    min={CANDIDATE_SETTINGS.min_media}
                                    max={CANDIDATE_SETTINGS.max_madia}
                                    value={negativeMedia}
                                    disabled
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className={styles["positive-block"]}>
                            <div className={styles["candidate-media-number-block"]}>
                                <input
                                    name={`country_${candidate.countryId}_candidate_${candidate.id}_pos`}
                                    id={`country_${candidate.countryId}_candidate_${candidate.id}_pos`}
                                    type="text"
                                    min={CANDIDATE_SETTINGS.min_media}
                                    max={CANDIDATE_SETTINGS.max_madia}
                                    value={positiveMedia}
                                    disabled
                                    readOnly
                                />
                            </div>
                            <div>
                                <span>
                                    {TEXT_CANDIDATES.media.positive}
                                    <br />
                                    {TEXT_CANDIDATES.media.here_is_100_percentage}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <input
                            name={`country_${candidate.countryId}_candidate_${candidate.id}_range_media`}
                            id={`country_${candidate.countryId}_candidate_${candidate.id}_range_media`}
                            type="range"
                            min={CANDIDATE_SETTINGS.min_media}
                            max={CANDIDATE_SETTINGS.max_madia}
                            value={positiveMedia}
                            onChange={(e) => {
                                const value = Number(e.target.value);

                                setPositiveMedia(value);
                                setNegativeMedia(CANDIDATE_SETTINGS.max_madia - value);

                                updatePresidentCandidate(candidate.id, {
                                    media: {
                                        positive: value,
                                        negative:
                                            CANDIDATE_SETTINGS.max_madia - value,
                                    },
                                });
                            }}
                        />
                    </div>
                </div>
                <div className={styles["election-rating"]}>
                    <div>
                        <div>{TEXT_CANDIDATES.election_rating_text}</div>

                        <div>
                            <input
                                name={`country_${candidate.countryId}_candidate_${candidate.id}_rating`}
                                id={`country_${candidate.countryId}_candidate_${candidate.id}_rating`}
                                type="text"
                                min={CANDIDATE_SETTINGS.min_rating}
                                max={CANDIDATE_SETTINGS.max_rating}
                                value={rating}
                                disabled
                                readOnly
                            />
                        </div>
                    </div>

                    <div>
                        <input
                            name={`country_${candidate.countryId}_candidate_${candidate.id}_range_rating`}
                            id={`country_${candidate.countryId}_candidate_${candidate.id}_range_rating`}
                            type="range"
                            min={CANDIDATE_SETTINGS.min_rating}
                            max={CANDIDATE_SETTINGS.max_rating}
                            value={rating}
                            onChange={(e) => {
                                const value = Number(e.target.value);

                                setRating(value);

                                updatePresidentCandidate(candidate.id, {
                                    election_rating: value,
                                });
                            }}
                        />
                    </div>
                </div>
            </div >
        </>
    );
};;