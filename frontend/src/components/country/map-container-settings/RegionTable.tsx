import { useGetRegionById } from "../../../hooks/region/useGetRegionById";
import { updateGroupService } from "../../../services/dataConsistencyVoterService";
import type { VotingGroup } from "../../../types/voter";
import { TEXT_TABLE_SAFETY_LEVEL } from "../../../ui/region_messages";
import { VOTERS_SETTINGS_TABLE } from "../../../ui/voters-settings-table";

import NumericInput from "./NumericInput";
import SelectComponentRegionTable from "./SelectComponentRegionTable";

import styles from "../../../styles/country/map-container-settings/RegionTable.module.css";


interface RegionTableProps {
    regionId: string;
    regionGroups: VotingGroup[];
}

export default function RegionTable({ regionId, regionGroups, }: RegionTableProps) {
    const region = useGetRegionById(regionId);
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
                                                value={String(group.details_descr[field.name] ?? "")}
                                                defaultMessage={field.default_message ?? ""}
                                                variants={field.possible_variants}
                                                onChange={(value) => {
                                                    updateGroupService(group.id, {
                                                        details_descr: {
                                                            ...group.details_descr,
                                                            [field.name]: value,
                                                        },
                                                    });
                                                }} />

                                        ) : (<>
                                            <NumericInput
                                                value={group.details_descr.peopleCount}
                                                onChange={(num) =>
                                                    updateGroupService(group.id, {
                                                        details_descr: {
                                                            ...group.details_descr,
                                                            peopleCount: num,
                                                        },
                                                    })
                                                }
                                            />
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