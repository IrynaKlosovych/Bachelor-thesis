import { BALANCE_RULES } from "../../constants/country";
import { useCandidateStore } from "../../store/candidateStore";
import type { BasePersonCandidate, PartyCandidate, PartyPersonCandidate } from "../../types/candidate";
import type { Country } from "../../types/country";
import type { Region } from "../../types/region";
import type { VotingGroup } from "../../types/voter";
import { AGE_AND_SEX_DISTRIBUTION_ERROR, BALANCED_DISTRIBUTION_ERROR, CANDIDATE_AND_SEATS_BY_REGIONS_MISMATCH_ERROR, COUNTRY_HAS_NO_DESCRIPTION_ERROR, ELECTION_RAITING_COUNTRY_SUM_ERROR, ELECTION_RAITING_REGION_SUM_ERROR, EMPTY_REGIONS_ERROR, NOT_ALL_CANDIDATES_ARE_FILLED_ERROR, NOT_ALL_PARTIES_ARE_FILLED_ERROR, NOT_ALL_VOTERS_ARE_FILLED_ERROR } from "../../ui/error_messages";
import { VOTERS_SETTINGS_TABLE } from "../../ui/voters-settings-table";

function isCountryFill(country: Country): boolean {
    if (country.descr === "") return false;
    return true;
}

function isVotersFill(voters: VotingGroup[]): boolean {
    return voters.length > 0 && voters.every(v => v.stageFilled === "ready");
}

function isPresidentialCandidatesFill(candidates: BasePersonCandidate[]): boolean {
    return candidates.length >= BALANCE_RULES.minCandidates && candidates.every(candidate =>
        candidate.name !== "" &&
        candidate.experience !== "" &&
        candidate.promise !== ""
    );
}

function isPartyFill(candidates: PartyCandidate[]) {
    return candidates.length >= BALANCE_RULES.minCandidates && candidates.every(candidate =>
        candidate.name !== "" &&
        candidate.experience !== "" &&
        candidate.promise !== ""
    );
}
function isPartyCandidatesFill(candidates: PartyPersonCandidate[], regions: Region[]) {
    return regions.every((region) => {
        const regCand = candidates.filter(
            (candidate) => candidate.regionId === region.id
        );

        return (
            regCand.length >= BALANCE_RULES.minCandidates + region.seats - 1 &&
            regCand.every(
                (candidate) =>
                    candidate.name !== "" &&
                    candidate.experience !== "" &&
                    candidate.promise !== ""
            )
        );
    });
}

function checkPresidentElectionSum(candidates: BasePersonCandidate[]): boolean {
    let sum = 0;
    candidates.map((candidate) => {
        sum += candidate.election_rating;
    });
    return sum === BALANCE_RULES.candidateTotal;
}

function checkPartyElectionSum(candidates: PartyCandidate[]) {
    let sum = 0;
    candidates.map((candidate) => {
        sum += candidate.election_rating;
    });
    return sum === BALANCE_RULES.candidateTotal;
}

function checkPartyPersonsByRegionsElectionSum(candidates: PartyPersonCandidate[], regions: Region[]) {
    return regions.every(region =>
        candidates
            .filter(candidate => candidate.regionId === region.id)
            .reduce((sum, candidate) => sum + candidate.election_rating, 0)
        === BALANCE_RULES.candidateTotal
    );
}

function checkAgeAndSexInCountry(voters: VotingGroup[]): boolean {
    const regionIds = [...new Set(voters.map(v => v.regionId))];

    const ageField = VOTERS_SETTINGS_TABLE.find(
        field => field.name === "age"
    );

    const sexField = VOTERS_SETTINGS_TABLE.find(
        field => field.name === "sex"
    );

    const requiredAges = ageField
        ? Object.values(ageField.possible_variants ?? {})
        : [];

    const requiredSexes = sexField
        ? Object.values(sexField.possible_variants ?? {})
        : [];

    return regionIds.every(regionId => {
        const regionVoters = voters.filter(
            v => v.regionId === regionId
        );

        return requiredAges.every(age =>
            requiredSexes.every(sex =>
                regionVoters.some(v =>
                    v.details_descr.age === age &&
                    v.details_descr.sex === sex &&
                    v.details_descr.peopleCount > 0
                )
            )
        );
    });
}

function hasAllRegionsPopulated(voters: VotingGroup[], regionIds: string[]): boolean {
    return regionIds.every(regionId => {
        const regionGroups = voters.filter(
            v => v.regionId === regionId
        );

        if (regionGroups.length === 0) return false;

        const total = regionGroups.reduce(
            (sum, v) => sum + v.details_descr.peopleCount,
            0
        );

        return total > 0;
    });
}

function hasBalancedDistribution(voters: VotingGroup[]): boolean {
    const regionIds = [...new Set(voters.map(v => v.regionId))];

    for (const regionId of regionIds) {
        const region = voters.filter(v => v.regionId === regionId);

        const total = region.reduce(
            (s, v) => s + v.details_descr.peopleCount,
            0
        );

        if (total === 0) return false;

        const ageField = VOTERS_SETTINGS_TABLE.find(f => f.name === "age");
        const sexField = VOTERS_SETTINGS_TABLE.find(f => f.name === "sex");

        const ages = Object.values(ageField?.possible_variants ?? {});
        const sexes = Object.values(sexField?.possible_variants ?? {});

        for (const age of ages) {
            const ageTotal = region
                .filter(v => v.details_descr.age === age)
                .reduce((s, v) => s + v.details_descr.peopleCount, 0);

            if (ageTotal / total < BALANCE_RULES.ageThreshold) return false;
        }

        for (const sex of sexes) {
            const sexTotal = region
                .filter(v => v.details_descr.sex === sex)
                .reduce((s, v) => s + v.details_descr.peopleCount, 0);

            if (sexTotal / total < BALANCE_RULES.sexThreshold) return false;
        }
    }

    return true;
}

function checkCandidatesAndSeatsInRegions(candidates: PartyCandidate[], regions: Region[]) {
    return candidates.every((candidate) => {
        const usedSeats =
            useCandidateStore.getState().getUsedPartyPersonRegionsSeats(candidate.id);

        return regions.every(
            (region) => region.seats >= (usedSeats[region.id] ?? 0)
        );
    });
}

export function defaultChecking(country: Country, regions: Region[], voters: VotingGroup[]) {
    const messages = [];
    if (!isCountryFill(country)) messages.push(COUNTRY_HAS_NO_DESCRIPTION_ERROR);
    if (!isVotersFill(voters)) messages.push(NOT_ALL_VOTERS_ARE_FILLED_ERROR);

    if (!checkAgeAndSexInCountry(voters))
        messages.push(AGE_AND_SEX_DISTRIBUTION_ERROR);
    const regionIds = regions.map(r => r.id);
    if (!hasAllRegionsPopulated(voters, regionIds))
        messages.push(EMPTY_REGIONS_ERROR);
    if (!hasBalancedDistribution(voters))
        messages.push(BALANCED_DISTRIBUTION_ERROR);
    return messages;
}

export function fillCheckingPresidentMode(country: Country, regions: Region[], voters: VotingGroup[], candidates: BasePersonCandidate[]) {
    const messages = defaultChecking(country, regions, voters);

    if (!isPresidentialCandidatesFill(candidates))
        messages.push(NOT_ALL_CANDIDATES_ARE_FILLED_ERROR);
    if (!checkPresidentElectionSum(candidates))
        messages.push(ELECTION_RAITING_COUNTRY_SUM_ERROR);

    return messages;
}

export function fillCheckingParliamentMode(country: Country, regions: Region[], voters: VotingGroup[], candidatesParty: PartyCandidate[], partyPersons: PartyPersonCandidate[]) {
    const messages = defaultChecking(country, regions, voters);

    if (!isPartyFill(candidatesParty))
        messages.push(NOT_ALL_PARTIES_ARE_FILLED_ERROR);
    if (!isPartyCandidatesFill(partyPersons, regions))
        messages.push(NOT_ALL_CANDIDATES_ARE_FILLED_ERROR);
    if (!checkPartyElectionSum(candidatesParty))
        messages.push(ELECTION_RAITING_COUNTRY_SUM_ERROR);
    if (!checkPartyPersonsByRegionsElectionSum(partyPersons, regions))
        messages.push(ELECTION_RAITING_REGION_SUM_ERROR);
    if (!checkCandidatesAndSeatsInRegions(candidatesParty, regions))
        messages.push(CANDIDATE_AND_SEATS_BY_REGIONS_MISMATCH_ERROR);
    return messages;
}