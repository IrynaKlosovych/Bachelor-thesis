import { useState } from "react";

import { useCountryStore } from "../../../store/countryStore";
import type { VotingGroup } from "../../../types/country";
import type { GroupFormData } from "../../../types/country";
import { TEXT_TABLE_SAFETY_LEVEL } from "../../../ui/messages";
import { VOTERS_SETTINGS_TABLE } from "../../../ui/voters-settings-table";

import SelectComponentRegionTable from "./SelectComponentRegionTable";

import styles from "../../../styles/country/map-container-settings/RegionTable.module.css";


interface RegionTableProps {
    regionId: string;

    regionGroups: VotingGroup[];
}

export default function RegionTable({
    regionId,
    regionGroups,
}: RegionTableProps) {

    const [formData, setFormData] =
        useState<GroupFormData>({});
    const allRegions = useCountryStore(
        state => state.regions
    );

    const region = allRegions.find(r => r.id === regionId);
    return (
        <div className={styles["region-container"]}>

            <div className={styles["region-title"]}>
                {region?.displayInTable}
            </div>

            <div className={styles["security-level"]}>
                {TEXT_TABLE_SAFETY_LEVEL} {region?.safety_level}
            </div>

            <div>
                <table className={styles["table"]}>
                    <thead>
                        <tr>
                            <th></th>
                            {VOTERS_SETTINGS_TABLE.map(field => (

                                <th key={`table_region_${regionId}_th_${field.name}`}>
                                    {field.display_name}
                                </th>

                            ))}
                        </tr>

                    </thead>
                    <tbody>
                        {regionGroups.map(group => (

                            <tr key={`table_region_${regionId}_group_${group.id}`}>

                                <td>{group.name}</td>

                                {VOTERS_SETTINGS_TABLE.map(field => (

                                    <td key={`table_region_${regionId}_group_${group.id}_field_${field.name}`}>

                                        {field.possible_variants ? (

                                            <SelectComponentRegionTable id={`table_region_${regionId}_group_${group.id}_field_${field.name}`}
                                            value={formData[group.id]?.[field.name] || ""}
                                                defaultMessage={field.default_message}
                                                variants={field.possible_variants}
                                                onChange={(value) => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        [group.id]: {
                                                            ...prev[group.id],
                                                            [field.name]: value
                                                        }
                                                    }));
                                                }} />

                                        ) : (<>
                                            {/* code later */}
                                        </>)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}