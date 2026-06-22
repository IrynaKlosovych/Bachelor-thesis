import { ELECTION_MODE_SETTINGS } from "../../constants/country";
import useGetPartyCandidatesByCountryId from "../../hooks/candidate/useGetPartyCandidatesByCountryId";
import { useGetPresidentCandidateByCountryId } from "../../hooks/candidate/useGetPresidentCandidateByCountryId";
import { useGetCountryById } from "../../hooks/country/useGetCountryById";
import { useGetRegionsByCountryId } from "../../hooks/region/useGetRegionsByCountryId";
import useResultsExists from "../../hooks/results/useResultsExists";
import { useGetVotersByCountryId } from "../../hooks/voter/useGetVotersByCountryId";
import { NO_CANDIDATES } from "../../ui/candidate_messages";

import EmptyCandidates from "./candidates/EmptyCandidates";
import PartyCandidate from "./candidates/PartyCandidate";
import PersonCandidate from "./candidates/PersonCandidate";
import PopulationPyramid from "./charts/PopulationPyramid";
import AddCandidateButton from "./descr-block-settings/AddCandidateButton";
import CountryDescr from "./descr-block-settings/CountryDescr";
import ElectionModeChoosen from "./descr-block-settings/ElectionModeChoosen";
import AddVoterButton from "./map-container-settings/AddVoterButton";
import Map from "./map-container-settings/Map";
import VotersTable from "./map-container-settings/VotersTable";
import NoResultYet from "./results-panel/NoResultYet";
import ParliamentarySendButton from "./results-panel/parliamentary-elems/ParliamentarySendButton";
import ResultParliamentaryPanel from "./results-panel/parliamentary-elems/ResultParliamentaryPanel";
import PresidentialSendButton from "./results-panel/presidential-elems/PresidentialSendButton";
import ResultPresidentialPanel from "./results-panel/presidential-elems/ResultPresidentialPanel";
import CopyCountryButton from "./settings-panel/CopyCountryButton";
import CountryNameInput from "./settings-panel/CountryNameInput";
import DeleteCountryButton from "./settings-panel/DeleteCountryButton";

import styles from "../../styles/country/CountryLayout.module.css";
interface CountryLayoutProps {
    id: string;
    label: string;
}

export default function CountryLayout({ id, label }: CountryLayoutProps) {
    const country = useGetCountryById(id)!;
    const regions = useGetRegionsByCountryId(id);
    const voting_groups = useGetVotersByCountryId(id);
    const presidentCandidates = useGetPresidentCandidateByCountryId(id);
    const partyCandidates = useGetPartyCandidatesByCountryId(id);
    const resultExists = useResultsExists(country.electionMode, country.id);

    return (
        <div
            className={styles['country-template']}>
            <div>
                <div className={styles['country-settings-panel']}>
                    <div>
                        <CountryNameInput id={id} label={label} />
                    </div>
                    <div>
                        <CopyCountryButton countryId={id} />
                        <DeleteCountryButton countryId={id} />
                    </div>
                </div>
                <div className={styles["map-container-settings"]}>
                    <div className={styles['map-voters-container']}>
                        <div>
                            <div><AddVoterButton countryId={id} /></div>
                            <div><Map countryId={id}></Map></div>
                        </div>
                    </div>
                    <div className={styles["voters-params-table-container"]}>
                        <div>
                            <VotersTable countryId={id} />
                        </div>
                    </div>
                </div>
                <div className={styles["charts-container"]}>
                    <div>
                        <PopulationPyramid
                            region={null}
                            voting_group={voting_groups}
                            country={country} />
                        {regions.map((region) => (
                            <PopulationPyramid
                                country={country}
                                key={`country_${id}_region_${region.id}_chart`}
                                region={region}
                                voting_group={voting_groups.filter(g => g.regionId === region.id)}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles["descr-block-settings"]}>
                    <div>
                        <ElectionModeChoosen countryId={id} />
                        <AddCandidateButton countryId={id} />
                    </div>
                    <div>
                        <CountryDescr countryId={id} />
                    </div>
                </div>
                <div className={styles["candidate-block"]}>
                    <div>
                        {country.electionMode === ELECTION_MODE_SETTINGS.presidential.key ? (
                            presidentCandidates.length > 0 ? (
                                presidentCandidates.map((candidate) => (
                                    <PersonCandidate
                                        key={candidate.componentId}
                                        electionMode={country.electionMode}
                                        candidate={candidate}
                                    />
                                ))
                            ) : (
                                <EmptyCandidates text={NO_CANDIDATES.person} />
                            )
                        ) : (
                            partyCandidates.length > 0 ? (
                                partyCandidates.map((candidate) => (
                                    <PartyCandidate
                                        key={candidate.componentId}
                                        candidate={candidate}
                                    />
                                ))
                            ) : (
                                <EmptyCandidates text={NO_CANDIDATES.party} />
                            )
                        )}
                    </div>
                </div>
                <div className={styles["send-button-container"]}>
                    {country.electionMode === ELECTION_MODE_SETTINGS.presidential.key ? (
                        <PresidentialSendButton countryId={country.id}></PresidentialSendButton>
                    ) : (
                        <ParliamentarySendButton countryId={country.id} />
                    )}
                </div>
                <div className={styles["results-container"]}>
                    {country.electionMode === ELECTION_MODE_SETTINGS.presidential.key && resultExists ?
                        <ResultPresidentialPanel countryId={country.id} /> :
                        country.electionMode === ELECTION_MODE_SETTINGS.parliamentary.key && resultExists ?
                            <ResultParliamentaryPanel countryId={country.id} /> :
                            <NoResultYet></NoResultYet>}
                </div>
            </div>
        </div >
    );
}