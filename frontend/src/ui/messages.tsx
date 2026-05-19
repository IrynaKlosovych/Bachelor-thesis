import { COUNTRY_BORDERS } from "../constants/country_borders";
export const SCREEN_SIZE_WARNING = {
  title: "Обмежений розмір екрана",
  description: "Поточний розмір екрана є замалим для коректної роботи симулятора.",
  recommendation: "Для повного доступу до функціоналу рекомендується використовувати пристрій із шириною екрана від",
};

export const SCREEN_DEFAULT_MESSAGE = {
  title: "Симулятор для аналізу та прогнозу результатів виборів",
  titleMessage: "Цей симулятор розроблено з навчально-дослідницькою метою!",
  textMessage: "Метою симулятора для аналізу та прогнозування результатів виборів є на основі характеристик представників електорату, зовнішніх чинників (що можуть описувати стан країни), характеристик кандидатів дослідити фактори, що впливають на голосування за певного кандидата, а також проаналізувати результати за різними виборчими системами."
};

export const CREATE_COUNTRY_BUTTON_MESSAGE = "Створити країну";
export const DEFAULT_VISIBLE_COUNTRY_NAME = "Країна №";
export const CLOSE_CHOOSE_SAFETY_BUTTON_POPUP = "X";
export const VOTING_GROUP_NAME_TEXT = "Категорія";
export const TEXT_TABLE_SAFETY_LEVEL = "Рівень безпеки:";
export const TEXT_DELETE = "Видалити";
export const TEXT_COUNTRY_DESCR = "Опис країни";
export const TEXT_ADD_CANDIDATE = "Додати кандидата";
export const TEXT_MODE_TO_CHOOSE = "Орган, що обирається";
export const TEXT_CANDIDATES = {
  person_candidate_name_text: "ПІБ кандидата",
  person_candidate_descr_text: "Опис досвіду та попередньої діяльності",
  candidate_promis: "Передвиборчі обіцянки",
  media: {
    text: "Медіа про кандидата",
    negative: "Негатив",
    positive: "Позитив",
    here_is_100_percentage: "тут 100%"
  },
  election_rating_text: "Електоральний рейтинг",

};

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