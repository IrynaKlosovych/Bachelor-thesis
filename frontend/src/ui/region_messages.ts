import { COUNTRY_BORDERS } from "../constants/country_borders";
export const CLOSE_CHOOSE_SAFETY_BUTTON_POPUP = "X";
export const TEXT_TABLE_SAFETY_LEVEL = "Рівень безпеки:";
export const TEXT_REGIONS = [
    {
        key: "region1",
        displayInTable: "Регіон 1",
        d: COUNTRY_BORDERS.path1.d,
    },
    {
        key: "region2",
        displayInTable: "Регіон 2",
        d: COUNTRY_BORDERS.path2.d,
    },
    {
        key: "region3",
        displayInTable: "Регіон 3",
        d: COUNTRY_BORDERS.path3.d,
    },
    {
        key: "region4",
        displayInTable: "Регіон 4",
        d: COUNTRY_BORDERS.path4.d,
    },
    {
        key: "region5",
        displayInTable: "Регіон 5",
        d: COUNTRY_BORDERS.path5.d,
    },
];