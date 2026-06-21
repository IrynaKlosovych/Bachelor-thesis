import { useGetPresidentCandidateByCountryId } from "../../../../hooks/candidate/useGetPresidentCandidateByCountryId";
import type { UUID } from "../../../../types/general";

import styles from "../../../../styles/country/results-panel/ResultTables.module.css";
interface CondorcetProps {
    countryId: UUID;
    voting_system: Record<UUID, Record<UUID, {
        expression: string;
        result: "win" | "loss" | "same";
    }>>;
}
export default function Condorcet({ countryId, voting_system }: CondorcetProps) {
    const candidates = useGetPresidentCandidateByCountryId(countryId);
    const candidatesIds = Object.keys(voting_system); return (
        <>
            <div>
                <table className={styles["table"]}>
                    <thead>
                        <tr>
                            <th></th>
                            {candidatesIds.map((id) => {
                                const candidate = candidates?.find((c) => c.id === id);

                                return (
                                    <th key={`condorcet_th_candidate_${id}`}>
                                        {candidate?.name ?? id}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {candidatesIds.map((id) => {
                            const candidate = candidates?.find((c) => c.id === id);
                            return (
                                <tr key={`tr_res_candidate_${id}`}>
                                    <td className={styles["th"]}>{candidate?.name ?? id}</td>
                                    {candidatesIds.map((newId) => {
                                        const expr = voting_system[id][newId].expression === "same" ? "" : voting_system[id][newId].expression;
                                        const res = voting_system[id][newId].result;
                                        return (
                                            <td key={`td_res_candidate_{id}_candidate_${newId}`}
                                                className={styles[`${res}`]}>
                                                <div>{res}</div>
                                                <div>{expr}</div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}