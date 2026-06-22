import { v4 as uuidv4 } from "uuid";

import { REGIONS_SETTINGS } from "../../constants/region";
import type { UUID } from "../../types/general";
import type { Region, RegionKeyName } from "../../types/region";
import { TEXT_REGIONS } from "../../ui/region_messages";
import { ComponentIdFactory } from "../../utils/general/countryTypesFunctions";

export function createRegions(countryId: UUID): Region[] {
    const regionsInCountry: Region[] = [];

    Object.entries(REGIONS_SETTINGS).forEach(
        ([regionKey]) => {
            const regionId = uuidv4();
            const displayInTable = TEXT_REGIONS.find(region => region.key === regionKey)?.displayInTable;
            if (!displayInTable) return;
            regionsInCountry.push({
                id: regionId,
                countryId: countryId,
                regionKeyName: regionKey as RegionKeyName,
                displayInTable: displayInTable,
                component_id:
                    ComponentIdFactory.region(countryId, regionId),
                safety_level: 5,
                seats: 1
            });
        }
    );
    return regionsInCountry;
}

export function copyRegions(regionsToCopy: Region[], countryId: UUID): Region[] {
    const copiedRegions = regionsToCopy.map((region) => {
        const newRegionId = uuidv4();
        return {
            ...region,
            id: newRegionId,
            countryId: countryId,
            componentId: ComponentIdFactory.region(countryId, newRegionId),
        };
    });
    return copiedRegions;
}
