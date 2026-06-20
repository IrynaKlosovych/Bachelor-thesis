import type { BasePersonCandidate } from "../../../../types/candidate";
import type { Region } from "../../../../types/region";
import type { VoterPresidentialResult } from "../../../../types/results";
import { TABLE_RESULT_TEXT } from "../../../../ui/result-messages";

import styles from "../../../../styles/country/results-panel/ResultTables.module.css";
interface RegionResultPresidentialTableProps {
    voters: VoterPresidentialResult[];
    region: Region;
    candidates: BasePersonCandidate[];
}
export default function RegionResultPresidentialTable({ voters, region, candidates }: RegionResultPresidentialTableProps) {
    const candidateIds = candidates.map(c => c.id);
    return (
        <>
            <div className={styles["region-container"]}>

                <div className={styles["region-result-title"]}>
                    {region?.displayInTable}
                </div>

                <div>
                    <table className={styles["table"]}>
                        <thead>
                            <tr>
                                <th rowSpan={2}></th>
                                <th rowSpan={2}>{TABLE_RESULT_TEXT.probability_take_part}</th>
                                <th colSpan={candidateIds.length}>{TABLE_RESULT_TEXT.voters_prio}</th>
                            </tr>
                            <tr>
                                {candidateIds.map(id => (
                                    <th key={`res_presidential_region_table_cand_names_${id}`}>
                                        {candidates.find(c => c.id === id)?.name}
                                    </th>
                                ))}
                            </tr>

                        </thead>
                        <tbody>
                            {voters.map((voter) => (
                                <tr key={`res_presidential_region_table_voter_res_${voter.id}`}>
                                    <td>{voter.name}</td>

                                    <td>{voter.probability_take_part.toFixed(2).toString()}</td>

                                    {candidateIds.map((candId) => (
                                        <td key={`res_presidential_region_table_voter_cand_res_${candId}`}>
                                            {voter.president_candidate_similarity?.[candId]?.priority ?? ""}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};;