import { copyPartyCandidate, copyPartyPersonCandidate, copyPresidentCandidate } from "../factories/candidate/candidatesFactory";
import { copyCountry, createCountry } from "../factories/country/countryFactory";
import { copyRegions, createRegions } from "../factories/region/regionsFactory";
import { copyVoter } from "../factories/voter/voterFactory";
import { useCandidateStore } from "../store/candidateStore";
import { useCountryStore } from "../store/countryStore";
import { useRegionStore } from "../store/regionStore";
import { useVoterStore } from "../store/voterStore";
import type { PartyCandidate, PartyPersonCandidate, PresidentPersonCandidate } from "../types/candidate";
import type { UUID } from "../types/general";
import type { VotingGroup } from "../types/voter";

export function addCountryService() {
    const countryNumber = useCountryStore.getState().getCountryNumForName();
    const country = createCountry(countryNumber);
    useCountryStore.getState().addCountry(country);
    useCountryStore.getState().incrementCountryNumForName();

    const regions = createRegions(country.id);
    useRegionStore.getState().addRegionsToCountry(regions);

    useVoterStore.getState().setVotingGroupCounter(country.id, 0);

    useCountryStore.getState().setActiveCountry(country.id);
}

export function copyCountryService(countryIdToCopy: UUID) {
    const countryToCopy = useCountryStore.getState().getCountryById(countryIdToCopy);
    if (!countryToCopy) return;
    const res_country = copyCountry(countryToCopy);
    useCountryStore.getState().incrementCountryNumForName();
    useCountryStore.getState().addCountry(res_country);

    const regionsToCopy = useRegionStore.getState().getRegionsByCountryId(countryIdToCopy);
    const newRegions = copyRegions(regionsToCopy, res_country.id);
    useRegionStore.getState().copyCountryRegions(newRegions);

    const votingGroupsToCopy = useVoterStore.getState().getVotersByCountryId(countryIdToCopy);
    // voters
    // voting_groups: VotingGroup[];
    const newVoters: VotingGroup[] = [];
    regionsToCopy.map((regionToCopy) => {
        newRegions.map((newRegion) => {
            votingGroupsToCopy.map((voterToCopy) => {
                if (voterToCopy.regionId === regionToCopy.id && regionToCopy.regionKeyName === newRegion.regionKeyName) {
                    const newVoter = copyVoter(voterToCopy, res_country.id, newRegion.id);
                    newVoters.push(newVoter);
                }
            });
        });
    });
    useVoterStore.getState().addCopiedVotingGroups(newVoters);

    // voting_groups_counter: Record<UUID, number>;
    const newVoterCounter = useVoterStore.getState().getVotingGroupCounter(countryIdToCopy);
    useVoterStore.getState().setVotingGroupCounter(res_country.id, newVoterCounter);

    // president candidate
    // president_person_candidates: PresidentPersonCandidate[];
    const presidentsToCopy = useCandidateStore.getState().getPresidentsByCountryId(countryIdToCopy);
    const resultPresidents: PresidentPersonCandidate[] = [];
    const resultPresidentsWithOldIds: Record<UUID, PresidentPersonCandidate> = {};
    presidentsToCopy.map((presidentToCopy) => {
        const president = copyPresidentCandidate(res_country.id, presidentToCopy);
        resultPresidents.push(president);
        resultPresidentsWithOldIds[presidentToCopy.id] = president;
    });
    useCandidateStore.getState().addCopiedPresidentCandidates(resultPresidents);
    // used_president_candidate_hues: Record<UUID, Record<UUID, number>>;
    const presidentHuesToCopy = useCandidateStore.getState().getPresidentCandidateHues(countryIdToCopy);
    const newPresidentHues: Record<UUID, number> = {};
    presidentsToCopy.map((oldPresident) => {
        newPresidentHues[resultPresidentsWithOldIds[oldPresident.id].id] = presidentHuesToCopy[oldPresident.id];
    });
    useCandidateStore.getState().addCopiedPresidentHues(res_country.id, newPresidentHues);

    // party candidate
    // party_candidates: PartyCandidate[],
    const partiesToCopy = useCandidateStore.getState().getPartiesByCountryId(countryIdToCopy);
    const resultParties: PartyCandidate[] = [];
    const resultPartiesWithOldIds: Record<UUID, PartyCandidate> = {};
    const arrayOfOldPartiesId: UUID[] = [];
    partiesToCopy.map((partyToCopy) => {
        const party = copyPartyCandidate(res_country.id, partyToCopy);
        resultParties.push(party);
        resultPartiesWithOldIds[partyToCopy.id] = party;
        arrayOfOldPartiesId.push(partyToCopy.id);
    });
    useCandidateStore.getState().addCopiedPartiesCandidates(resultParties);
    // used_party_candidate_hues: Record<UUID, Record<UUID, number>>;
    const partyHuesToCopy = useCandidateStore.getState().getPartyCandidateHues(countryIdToCopy);
    const newPartyHues: Record<UUID, number> = {};
    partiesToCopy.map((oldParty) => {
        newPartyHues[resultPartiesWithOldIds[oldParty.id].id] = partyHuesToCopy[oldParty.id];
    });
    useCandidateStore.getState().addCopiedPartiesHues(res_country.id, newPartyHues);

    // party person candidate
    // party_person_candidates: PartyPersonCandidate[];
    const partyPersonsToCopy = useCandidateStore.getState().getPartyPersonsByCountryId(countryIdToCopy);
    const resultPartyPersons: PartyPersonCandidate[] = [];

    regionsToCopy.map((regionToCopy) => {
        newRegions.map((newRegion) => {
            partiesToCopy.map(partyToCopy => {
                partyPersonsToCopy.map((partyPersonToCopy) => {
                    if (partyPersonToCopy.regionId === regionToCopy.id && regionToCopy.regionKeyName === newRegion.regionKeyName && partyToCopy.id === partyPersonToCopy.partyID) {
                        const partyPerson = copyPartyPersonCandidate(newRegion.id, resultPartiesWithOldIds[partyToCopy.id], partyPersonToCopy);
                        resultPartyPersons.push(partyPerson);
                    }
                });
            });
        });
    });

    useCandidateStore.getState().addCopiedPartyPersonCandidates(resultPartyPersons);

    // used_party_person_regions_seats: Record<UUID, Record<UUID, number>>;
    const newUsedPartyPersonRegionsSeats: Record<UUID, Record<UUID, number>> = {};
    const oldUsedPartyPersonRegionsSeats = useCandidateStore.getState().getUsedOldPartyPersonRegionsSeats(arrayOfOldPartiesId);

    Object.entries(oldUsedPartyPersonRegionsSeats).forEach(
        ([oldPartyId, oldRegions]) => {

            const newParty = resultPartiesWithOldIds[oldPartyId];

            if (!newParty) return;

            newUsedPartyPersonRegionsSeats[newParty.id] = {};

            Object.entries(oldRegions).forEach(
                ([oldRegionId, count]) => {

                    const oldRegion = regionsToCopy.find(
                        r => r.id === oldRegionId
                    );

                    const newRegion = newRegions.find(
                        r => r.regionKeyName === oldRegion?.regionKeyName
                    );

                    if (newRegion) {
                        newUsedPartyPersonRegionsSeats[newParty.id][newRegion.id] = count;
                    }
                }
            );
        }
    );
    useCandidateStore.getState().addCopiedUsedRegionseats(newUsedPartyPersonRegionsSeats);

    useCountryStore.getState().setActiveCountry(res_country.id);
}

export function deleteCountryService(countryId: UUID) {
    const index = useCountryStore.getState().getCountryIndexById(countryId);
    useCountryStore.getState().deleteCountry(countryId);
    useCountryStore.getState().changeActiveCountryAfterDelete(index);

    useRegionStore.getState().deleteCountryRegions(countryId);

    useVoterStore.getState().deleteCountryGroups(countryId);
    useVoterStore.getState().deleteGroupsCounterbyCountryId(countryId);

    // president candidate
    // president_person_candidates: PresidentPersonCandidate[];
    useCandidateStore.getState().deletePresidentPersonCandidateByCountryId(countryId);
    // used_president_candidate_hues: Record<UUID, Record<UUID, number>>;
    useCandidateStore.getState().deletePresidentPersonCandidateHuesByCountryId(countryId);

    // party candidate
    // party_candidates: PartyCandidate[],
    const deleteParties = useCandidateStore.getState().getPartiesByCountryId(countryId);

    useCandidateStore.getState().deletePartyCandidateByCountryId(countryId);
    // used_party_candidate_hues: Record<UUID, Record<UUID, number>>;
    useCandidateStore.getState().deletePartyCandidateHuesByCountryId(countryId);

    // party person candidate
    // party_person_candidates: PartyPersonCandidate[];
    useCandidateStore.getState().deletePartyPersonCandidateByCountryId(countryId);
    // used_party_person_regions_seats: Record<UUID, Record<UUID, number>>;
    const PartyRegionsSeatsIdsToDelete = deleteParties.map(party => party.id);
    useCandidateStore.getState().deleteAllPartyRegionSeats(PartyRegionsSeatsIdsToDelete);
}

export function prevCountryService() {
    useCountryStore.getState().prevCountry();
}
export function nextCountryService() {
    useCountryStore.getState().nextCountry();
}