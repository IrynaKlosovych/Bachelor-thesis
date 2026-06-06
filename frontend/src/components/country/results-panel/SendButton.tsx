import { toast } from "react-toastify";

import { useGetPartyCandidateByCountryId } from "../../../hooks/candidate/useGetPartyCandidateByCountryId";
import { useGetPartyPersonCandidateByCountryId } from "../../../hooks/candidate/useGetPartyPersonCandidateByCountryId";
import { useGetPresidentCandidateByCountryId } from "../../../hooks/candidate/useGetPresidentCandidateByCountryId";
import { useGetCountryById } from "../../../hooks/country/useGetCountryById";
import { useGetRegionsByCountryId } from "../../../hooks/region/useGetRegionsByCountryId";
import { useGetVotersByCountryId } from "../../../hooks/voter/useGetVotersByCountryId";
import type { UUID } from "../../../types/general";
import { TEXT_SEND_DATA_TO_SERVER } from "../../../ui/country_messages";
import { fillCheckingParliamentMode, fillCheckingPresidentMode } from "../../../utils/general/fillChecking";
import Button from "../../Button";
import ServerError from "../../errors/ServerError";
import SimulationCheckError from "../../errors/SimulationCheckError";

import styles from "../../../styles/error/Errors.module.css";

const API_URL = import.meta.env.VITE_API_URL;
interface SendDataProps {
    countryId: UUID;
}
export default function SendButton({ countryId }: SendDataProps) {
    const country = useGetCountryById(countryId);
    const regions = useGetRegionsByCountryId(countryId);
    const voters = useGetVotersByCountryId(countryId);
    const candidatesPresident = useGetPresidentCandidateByCountryId(countryId);
    const candidatesParty = useGetPartyCandidateByCountryId(countryId);
    const candidatesPartyPersons = useGetPartyPersonCandidateByCountryId(countryId);
    if (!country) return;

    const candidates = country.electionMode === "presidential"
        ? candidatesPresident
        : {
            parties: candidatesParty,
            persons: candidatesPartyPersons,
        };

    const messages = country.electionMode === "presidential" ? fillCheckingPresidentMode(country, regions, voters, candidatesPresident) : fillCheckingParliamentMode(country, regions, voters, candidatesParty, candidatesPartyPersons);


    const handleSend = async () => {
        if (messages.length !== 0) {
            toast(<SimulationCheckError messages={messages}></SimulationCheckError>, {
                position: "bottom-right",
                className: styles.toast,
            });
            return;
        }
        // send data to server
        // receive data from server
        // save data in store
        // use data in result block with diagrams
        try {
            const response = await fetch(
                `${API_URL}api/calculate/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        country: country,
                        regions: regions,
                        voters: voters,
                        candidates: candidates
                    }),
                }
            );

            const data = await response.json();

        } catch {
            toast(<ServerError></ServerError>, {
                position: "bottom-right",
                className: styles.toast,
            });
        }
    };
    return (
        <>
            <Button
                text={TEXT_SEND_DATA_TO_SERVER}
                onClick={handleSend}>
            </Button>
        </>
    );
}