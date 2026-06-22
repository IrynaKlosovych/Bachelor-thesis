import { toast } from "react-toastify";

import { useGetPresidentCandidateByCountryId } from "../../../../hooks/candidate/useGetPresidentCandidateByCountryId";
import { useGetCountryById } from "../../../../hooks/country/useGetCountryById";
import { useGetRegionsByCountryId } from "../../../../hooks/region/useGetRegionsByCountryId";
import { useGetVotersByCountryId } from "../../../../hooks/voter/useGetVotersByCountryId";
import { useResultStore } from "../../../../store/resultStore";
import type { UUID } from "../../../../types/general";
import type { PresidentialResult } from "../../../../types/results";
import { fillCheckingPresidentMode } from "../../../../utils/general/fillChecking";
import ServerError from "../../../errors/ServerError";
import SimulationCheckError from "../../../errors/SimulationCheckError";
import SendButton from "../SendButton";

import styles from "../../../../styles/error/Errors.module.css";
interface PresidentialSendButtonProps {
    countryId: UUID;
}
const API_URL = import.meta.env.VITE_API_URL;
export default function PresidentialSendButton({ countryId }: PresidentialSendButtonProps) {
    const setResults = useResultStore(state => state.setResults);
    const deleteResults = useResultStore(state => state.deleteResults);
    const country = useGetCountryById(countryId);
    const regions = useGetRegionsByCountryId(countryId);
    const voters = useGetVotersByCountryId(countryId);
    const candidatesPresident = useGetPresidentCandidateByCountryId(countryId);
    if (!country) return;


    const messages = fillCheckingPresidentMode(country, regions, voters, candidatesPresident);
    const handleSend = async () => {
        if (messages.length !== 0) {
            toast(<SimulationCheckError messages={messages}></SimulationCheckError>, {
                position: "bottom-right",
                className: styles.toast,
            });
            return;
        }
        deleteResults(countryId, country.electionMode);
        try {
            const response = await fetch(
                `${API_URL}api/presidential-calculate/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        country: country,
                        regions: regions,
                        voters: voters,
                        candidates: candidatesPresident
                    })
                }
            );
            const data = await response.json() as PresidentialResult;
            setResults(country.id, country.electionMode, data);
        } catch {
            toast(<ServerError></ServerError>, {
                position: "bottom-right",
                className: styles.toast,
            });
        }
    };
    return (
        <>
            <SendButton
                handleSend={handleSend}
            ></SendButton>
        </>
    );
}