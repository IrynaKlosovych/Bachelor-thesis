import { ELECTION_MODE_SETTINGS } from "../../constants/country";
import { useGetPresidentCandidateByCountryId } from "../../hooks/candidate/useGetPresidentCandidateByCountryId";
import { useGetCountryById } from "../../hooks/country/useGetCountryById";
import { useGetRegionsByCountryId } from "../../hooks/region/useGetRegionsByCountryId";
import { useGetVotersByCountryId } from "../../hooks/voter/useGetVotersByCountryId";

import PersonCandidate from "./candidates/PersonCandidate";
import PopulationPyramid from "./charts/PopulationPyramid";
import AddCandidateButton from "./descr-block-settings/AddCandidateButton";
import CountryDescr from "./descr-block-settings/CountryDescr";
import ElectionModeChoosen from "./descr-block-settings/ElectionModeChoosen";
import AddVoterButton from "./map-container-settings/AddVoterButton";
import Map from "./map-container-settings/Map";
import VotersTable from "./map-container-settings/VotersTable";
import SendButton from "./results-panel/SendButton";
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
                    {country.electionMode === ELECTION_MODE_SETTINGS.presidential.key &&
                        presidentCandidates.map((candidate) => (
                            <PersonCandidate
                                key={`country_${id}_candidate_${candidate.id}`}
                                candidate={candidate}
                            />
                        ))}
                </div>
                <div className={styles["send-button-container"]}>
                    <SendButton></SendButton>
                </div>
                <div>
                    /*results */
                </div>
            </div>
        </div>
    );
}