import { toast } from "react-toastify";

import { useGetPartyCandidateByCountryId } from "../../../../hooks/candidate/useGetPartyCandidateByCountryId";
import { useGetPartyPersonCandidateByCountryId } from "../../../../hooks/candidate/useGetPartyPersonCandidateByCountryId";
import { useGetCountryById } from "../../../../hooks/country/useGetCountryById";
import { useGetRegionsByCountryId } from "../../../../hooks/region/useGetRegionsByCountryId";
import { useGetVotersByCountryId } from "../../../../hooks/voter/useGetVotersByCountryId";
import type { UUID } from "../../../../types/general";
import { fillCheckingParliamentMode } from "../../../../utils/general/fillChecking";
import ServerError from "../../../errors/ServerError";
import SimulationCheckError from "../../../errors/SimulationCheckError";
import SendButton from "../SendButton";

import styles from "../../../../styles/error/Errors.module.css";


interface ParliamentarySendButtonProps {
    countryId: UUID;
}
const API_URL = import.meta.env.VITE_API_URL;
export default function ParliamentarySendButton({ countryId }: ParliamentarySendButtonProps) {
    const country = useGetCountryById(countryId);
    const regions = useGetRegionsByCountryId(countryId);
    const voters = useGetVotersByCountryId(countryId);

    const candidatesParty = useGetPartyCandidateByCountryId(countryId);
    const candidatesPartyPersons = useGetPartyPersonCandidateByCountryId(countryId);
    if (!country) return;

    const messages = fillCheckingParliamentMode(country, regions, voters, candidatesParty, candidatesPartyPersons);
    const handleSend = async () => {
        if (messages.length !== 0) {
            toast(<SimulationCheckError messages={messages}></SimulationCheckError>, {
                position: "bottom-right",
                className: styles.toast,
            });
            return;
        }
        // delete prev data
        // send data to server
        // receive data from server
        // save data in store
        // use data in result block with diagrams
        try {
            const response = await fetch(
                `${API_URL}api/parliamentary-calculate/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        country: country,
                        regions: regions,
                        voters: voters,
                        candidates: {
                            "parties": candidatesParty,
                            "persons": candidatesPartyPersons
                        }
                    }),
                }
            );

            const data = await response.json();
            console.log(data);

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