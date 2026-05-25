import { v4 as uuidv4 } from "uuid";

import { ELECTION_MODE_SETTINGS } from "../../constants/country";
import type { Country } from "../../types/country";
import type { ElectionMode } from "../../types/country";
import { DEFAULT_VISIBLE_COPY_COUNTRY_NAME, DEFAULT_VISIBLE_COUNTRY_NAME } from "../../ui/country_messages";
import { ComponentIdFactory } from "../../utils/general/countryTypesFunctions";

export function createCountry(countryNumForName: number): Country {
    const countryId = uuidv4();
    const country = {
        id: countryId,
        componentId: ComponentIdFactory.country(countryId),
        label: `${DEFAULT_VISIBLE_COUNTRY_NAME} ${countryNumForName}`,
        electionMode: ELECTION_MODE_SETTINGS.presidential.key as ElectionMode,
        descr: "",
        totalSeats: 5
    };
    return country;
}

export function copyCountry(countryToCopy: Country): Country {
    const newCountryId = uuidv4();
    const country = {
        ...countryToCopy,
        id: newCountryId,
        componentId: ComponentIdFactory.country(newCountryId),
        label: countryToCopy.label + ` ${DEFAULT_VISIBLE_COPY_COUNTRY_NAME}`
    };
    return country;
}