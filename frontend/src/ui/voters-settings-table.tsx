import type { VotingGroup } from "../types/country";

type VotingGroupField = keyof VotingGroup["details_descr"];

type VoterSettingField = {
    name: VotingGroupField;
    display_name: string;
    default_message?: string;
    possible_variants?: Record<string, string>;
    type?: string;
};

export const VOTERS_SETTINGS_TABLE: VoterSettingField[] = [
    {
        name: "age",
        display_name: "Вікова група",
        default_message: "Оберіть вікову групу",
        possible_variants: {
            "18_30": "18-30",
            "31_45": "31-45",
            "46_60": "46-60",
            "60_plus": "60+"
        }
    },
    {
        name: "sex",
        display_name: "Стать",
        default_message: "Оберіть стать",
        possible_variants: {
            female: "Жіноча",
            male: "Чоловіча"
        }
    },
    {
        name: "nationality",
        display_name: "Національність",
        default_message: "Оберіть національність",
        possible_variants: {
            titular: "Титульна нація",
            minority: "Національна меншина"
        }
    },
    {
        name: "identity",
        display_name: "Ідентичність",
        default_message: "Оберіть ідентичність",
        possible_variants: {
            strong_ethnic: "Сильна етнічна ідентичність",
            civic_stronger: "Громадянська сильніша за етнічну",
            equal: "Однакова громадянська та етнічна"
        }
    },
    {
        name: "religion",
        display_name: "Вплив релігії на політичні погляди",
        default_message: "Оберіть рівень впливу",
        possible_variants: Object.fromEntries(
            Array.from({ length: 11 }, (_, i) => [
                String(i),
                String(i)
            ])
        )
    },
    {
        name: "peopleCount",
        display_name: "Кількість людей",
    },
];