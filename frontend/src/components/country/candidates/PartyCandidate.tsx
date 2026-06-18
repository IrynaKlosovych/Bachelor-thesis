import { useState } from "react";

import { CANDIDATE_SETTINGS } from "../../../constants/candidate";
import useGetPartyPersonsByPartyId from "../../../hooks/candidate/useGetPartyPersonsByPartyId";
import { useGetRegionsByCountryId } from "../../../hooks/region/useGetRegionsByCountryId";
import { addPartyPersonCandidateService, deletePartyCandidate } from "../../../services/dataConsistencyCandidateService";
import { useCandidateStore } from "../../../store/candidateStore";
import type { PartyCandidate } from "../../../types/candidate";
import type { UUID } from "../../../types/general";
import { TEXT_ADD_CANDIDATE, TEXT_CANDIDATES } from "../../../ui/candidate_messages";

import CandidateNameInput from "./elements-profile/CandidateNameInput";
import CandidateSettingsBlock from "./elements-profile/CandidateSettingsBlock";
import CandidateElectionRating from "./elements-profile/media-rating-blocks/CandidateElectionRating";
import CandidateMediaBlock from "./elements-profile/media-rating-blocks/CandidateMediaBlock";
import TextAreaField from "./elements-profile/TextAreaField";
import PersonCandidate from "./PersonCandidate";

import styles from "../../../styles/country/candidates/PartyCandidate.module.css";

interface PartyCandidateProps {
    candidate: PartyCandidate;
}
export default function PartyCandidate({ candidate }: PartyCandidateProps) {
    const { updatePartyCandidate } = useCandidateStore();
    const used_regions_seats = useCandidateStore().getUsedPartyPersonRegionsSeats(candidate.id);

    const regions = useGetRegionsByCountryId(candidate.countryId);
    const [regionToAddCandidate, updateRegionToAddCandidate] =
        useState<UUID>(regions[0]?.id);

    const party_persons = useGetPartyPersonsByPartyId(candidate.id);
    const handleDeleteParty = () => {
        deletePartyCandidate(candidate.id);
    };

    return (
        <>
            <div className={styles["party-candidate-block"]}>
                <div className={styles["party-setting-block"]}>
                    <CandidateNameInput
                        name={candidate.componentId + `_name`}
                        id={candidate.componentId + `_name`}
                        value={candidate.name}
                        classes={[
                            "candidate-name-input",
                            "party-candidate-name-input"
                        ]}
                        placeholder={TEXT_CANDIDATES.party_candidate_name_text}
                        onChange={(value) =>
                            updatePartyCandidate(candidate.id, {
                                name: value,
                            })}
                    ></CandidateNameInput>
                    <CandidateSettingsBlock onClick={handleDeleteParty}
                        candidate_color={candidate.color}
                    ></CandidateSettingsBlock>
                </div>

                <div className={styles["party-candidate-block-second-part"]}>
                    <div>
                        <TextAreaField
                            name={`${candidate.componentId}_experience`}
                            id={`${candidate.componentId}_experience`}
                            value={candidate.experience}
                            classes={[
                                "candidate-experience",
                                "party-candidate-experience"
                            ]}
                            placeholder={TEXT_CANDIDATES.person_candidate_descr_text}
                            onChange={(value) => updatePartyCandidate(candidate.id, {
                                experience: value,
                            })}
                        ></TextAreaField>
                    </div>
                    <div>
                        <CandidateMediaBlock
                            candidate_media_text={TEXT_CANDIDATES.media.text_party}
                            classes={["candidate-media", "party-candidate-media"]}
                            candidate_componentId={candidate.componentId}
                            candidate_media_negative={candidate.media.negative}
                            candidate_media_positive={candidate.media.positive}
                            onChange={(value) => {
                                const mediaValue = Number(value);

                                updatePartyCandidate(candidate.id, {
                                    media: {
                                        positive: mediaValue,
                                        negative: CANDIDATE_SETTINGS.max_madia - mediaValue,
                                    },
                                });
                            }}
                        ></CandidateMediaBlock>
                        <CandidateElectionRating
                            classes={["election-rating", "party-election-rating"]}
                            candidate_componentId={candidate.componentId}
                            candidate_election_rating={candidate.election_rating}
                            onChange={(value) => {
                                const rating_value = Number(value);
                                updatePartyCandidate(candidate.id, {
                                    election_rating: rating_value,
                                });
                            }}
                        ></CandidateElectionRating>
                    </div>
                </div>

                <div className={styles["party-candidate-block-third-part"]}>
                    <div>
                        <TextAreaField
                            name={`${candidate.componentId}_promise`}
                            id={`${candidate.componentId}}_promise`}
                            classes={["candidate-promise", "party-candidate-promise"]}
                            placeholder={TEXT_CANDIDATES.candidate_promis}
                            value={candidate.promise}
                            onChange={(value) =>
                                updatePartyCandidate(candidate.id, {
                                    promise: value,
                                })
                            }>
                        </TextAreaField>
                    </div>
                    <div className={styles["add-party-person-candidate-container"]}>
                        <div>
                            <div>{TEXT_CANDIDATES.add_party_person_candidate.region}</div>
                            <div>
                                <span>{TEXT_CANDIDATES.add_party_person_candidate.available}</span>
                                <span>/</span>
                                <span>{TEXT_CANDIDATES.add_party_person_candidate.total}</span>
                            </div>
                        </div>
                        <div>
                            <select
                                name={`${candidate.componentId}_select`}
                                id={`${candidate.componentId}_select`}
                                value={regionToAddCandidate}
                                onChange={(e) => {
                                    const regionId = e.target.value;
                                    updateRegionToAddCandidate(regionId);
                                }}
                            >
                                {regions.map((region) => (
                                    <option
                                        key={`${region.component_id}_choose_region`}
                                        value={region.id}
                                    >
                                        {"\u00A0\u00A0\u00A0"}{region.displayInTable}  {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}{region.seats - used_regions_seats[region.id]} {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}/ {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}{region.seats}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <button
                                onClick={() => addPartyPersonCandidateService(regionToAddCandidate, candidate)}>
                                {TEXT_ADD_CANDIDATE.person}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles["party-persons-candidates"]}>
                    {regions.map((region) => {
                        const regionPersons = party_persons.filter(
                            person => person.regionId === region.id
                        );
                        return (
                            <div
                                key={`${region.component_id}_candidates_row`}
                                className={
                                    regionPersons.length === 0
                                        ? styles["party-persons-candidate-none"]
                                        : styles["region-candidates-row"]
                                }>
                                {regionPersons.map((person) => (
                                    <PersonCandidate
                                        key={`${person.componentId}_party_person_candidates`}
                                        electionMode="parliamentary"
                                        candidate={person}
                                    />
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}