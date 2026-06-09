import { CANDIDATE_SETTINGS } from "../../../constants/candidate";
import { ELECTION_MODE_SETTINGS } from "../../../constants/country";
import { useGetRegionsByCountryId } from "../../../hooks/region/useGetRegionsByCountryId";
import { updateRegionCandidateService } from "../../../services/dataConsistencyCandidateService";
import { useCandidateStore } from "../../../store/candidateStore";
import type { PersonCandidate } from "../../../types/candidate";
import type { ElectionMode } from "../../../types/country";
import { TEXT_CANDIDATES } from "../../../ui/candidate_messages";

import CandidateNameInput from "./elements-profile/CandidateNameInput";
import CandidateSettingsBlock from "./elements-profile/CandidateSettingsBlock";
import CandidateElectionRating from "./elements-profile/media-rating-blocks/CandidateElectionRating";
import CandidateMediaBlock from "./elements-profile/media-rating-blocks/CandidateMediaBlock";
import TextAreaField from "./elements-profile/TextAreaField";

import styles from "../../../styles/country/candidates/PersonCandidate.module.css";

interface PersonCandidateProps {
    electionMode: ElectionMode;
    candidate: PersonCandidate;
}
export default function PersonCandidate({ candidate, electionMode }: PersonCandidateProps) {
    const { updatePresidentCandidate, updatePartyPersonCandidate } = useCandidateStore();
    const regions = useGetRegionsByCountryId(candidate.countryId);
    const getUsedPartyPersonRegionsSeats = useCandidateStore(
        state => state.getUsedPartyPersonRegionsSeats
    );
    const used_regions_seats =
        "partyID" in candidate
            ? getUsedPartyPersonRegionsSeats(candidate.partyID)
            : {};

    const handleUpdateCandidate = (data: Partial<PersonCandidate>) => {
        if (electionMode === ELECTION_MODE_SETTINGS.presidential.key) {
            updatePresidentCandidate(candidate.id, data);
        }
        else {
            updatePartyPersonCandidate(candidate.id, data);
        }
    };

    return (
        <>
            <div className={`${styles["person-candidate-block"]} ${electionMode === ELECTION_MODE_SETTINGS.parliamentary.key
                ? styles["person-party-candidate-block"]
                : ""
                }`}>
                <CandidateSettingsBlock candidate_color={candidate.color}
                ></CandidateSettingsBlock>
                {electionMode === ELECTION_MODE_SETTINGS.parliamentary.key && "regionId" in candidate && (
                    <div className={styles["person-party-candidate-block-region-select"]}>
                        <select
                            name={`${candidate.componentId}_select`}
                            id={`${candidate.componentId}_select`}
                            value={candidate.regionId}
                            onChange={(e) => {
                                const newRegionId = e.target.value;
                                updateRegionCandidateService(candidate.id, candidate.partyID, candidate.regionId, newRegionId);
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
                )}
                <CandidateNameInput
                    name={candidate.componentId + `_name`}
                    id={candidate.componentId + `_name`}
                    value={candidate.name}
                    classes={[
                        "candidate-name-input",
                    ]}
                    placeholder={TEXT_CANDIDATES.person_candidate_name_text}
                    onChange={(value) =>
                        handleUpdateCandidate({
                            name: value,
                        })
                    }
                ></CandidateNameInput>
                <TextAreaField
                    name={`${candidate.componentId}_experience`}
                    id={`${candidate.componentId}_experience`}
                    value={candidate.experience}
                    classes={[
                        "candidate-experience"
                    ]}
                    placeholder={TEXT_CANDIDATES.person_candidate_descr_text}
                    onChange={(value) => handleUpdateCandidate({
                        experience: value,
                    })}
                ></TextAreaField>
                <TextAreaField
                    name={`${candidate.componentId}_promise`}
                    id={`${candidate.componentId}_promise`}
                    classes={["candidate-promise"]}
                    placeholder={TEXT_CANDIDATES.candidate_promis}
                    value={candidate.promise}
                    onChange={(value) =>
                        handleUpdateCandidate({
                            promise: value,
                        })
                    }>
                </TextAreaField>
                <CandidateMediaBlock
                    candidate_media_text={TEXT_CANDIDATES.media.text_person}
                    classes={["candidate-media"]}
                    candidate_componentId={candidate.componentId}
                    candidate_media_negative={candidate.media.negative}
                    candidate_media_positive={candidate.media.positive}
                    onChange={(value) => {
                        const mediaValue = Number(value);

                        handleUpdateCandidate({
                            media: {
                                positive: mediaValue,
                                negative: CANDIDATE_SETTINGS.max_madia - mediaValue,
                            },
                        });
                    }}
                ></CandidateMediaBlock>
                <CandidateElectionRating
                    classes={["election-rating"]}
                    candidate_componentId={candidate.componentId}
                    candidate_election_rating={candidate.election_rating}
                    onChange={(value) => {
                        const rating_value = Number(value);
                        handleUpdateCandidate({
                            election_rating: rating_value,
                        });
                    }}
                ></CandidateElectionRating>
            </div >
        </>
    );
};;