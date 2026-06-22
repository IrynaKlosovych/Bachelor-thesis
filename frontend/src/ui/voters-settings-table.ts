import type { VoterSettingField } from "../types/voter";

export const VOTERS_SETTINGS_TABLE: VoterSettingField[] = [
    {
        /* 1 */
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
        /* 2 */
        name: "sex",
        display_name: "Стать",
        default_message: "Оберіть стать",
        possible_variants: {
            female: "Жіноча",
            male: "Чоловіча"
        }
    },
    {
        /* 3 */
        name: "nationality",
        display_name: "Національність",
        default_message: "Оберіть національність",
        possible_variants: {
            titular: "Титульна нація",
            minority: "Національна меншина"
        }
    },
    {
        /* 4 */
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
        /* 5 */
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
    {
        /* 6 */
        name: "education",
        display_name: "Рівень освіти",
        default_message: "Оберіть рівень освіти",
        possible_variants: {
            base: "9-11 класи",
            prof: "Профтех/коледж",
            high: "Вища освіта",
            almost_high: "Незакінчена вища"
        }
    },
    {
        /* 7 */
        name: "economic_status",
        display_name: "Економічний статус домогосподарства",
        default_message: "Оберіть економічний статус домогосподарства",
        possible_variants: {
            low: "Низький",
            lower_avg: "Нижче середнього",
            avg: "Середній",
            upper_avg: "Вище середнього",
            high: "Високий",
            cool: "Заможний"
        }
    },
    {
        /* 8 */
        name: "finance_independent",
        display_name: "Фінансова незалежність",
        default_message: "Оберіть рівень фінансової незалежності",
        possible_variants: {
            full_depends: "Повністю залежний", mostly_depends: "Переважно залежний",
            partly: "Частково і так, і так",
            mostly_independs: "Переважно самостійний",
            full_independs: "Повністю самостійний"
        }
    },
    {
        /* 9 */
        name: "interest_econ",
        display_name: "Зацікавленість економікою",
        default_message: "Оберіть рівень зацікавленості економікою",
        possible_variants: Object.fromEntries(
            Array.from({ length: 11 }, (_, i) => [
                String(i),
                String(i)
            ])
        )
    },
    {
        /* 10 */
        name: "interest_safety",
        display_name: "Зацікавленість безпекою та обороною",
        default_message: "Оберіть рівень зацікавленості безпекою та обороною",
        possible_variants: Object.fromEntries(
            Array.from({ length: 11 }, (_, i) => [
                String(i),
                String(i)
            ])
        )
    },
    {
        /* 11 */
        name: "interest_social",
        display_name: "Зацікавленість соціальним життям",
        default_message: "Оберіть рівень зацікавленості соціальним життям",
        possible_variants: Object.fromEntries(
            Array.from({ length: 11 }, (_, i) => [
                String(i),
                String(i)
            ])
        )
    },
    {
        /* 12 */
        name: "understanding_econ",
        display_name: "Розуміння економіки",
        default_message: "Оберіть рівень розуміння економіки",
        possible_variants: {
            zero_level: "Не орієнтується у темі та не може пояснити базові поняття",
            first_level: "Розуміє загальні ідеї, але складно пояснювати або застосовувати їх",
            second_level: "Може пояснити основні поняття іншій людині та розуміє типові приклади",
            third_level: "Впевнено застосовує знання на практиці та може аналізувати ситуації",
            fourth_level: "Може критично оцінювати інформацію, знаходити помилки та аргументувати позицію"
        }
    },
    {
        /* 13 */
        name: "understanding_safety",
        display_name: "Розуміння сфери безпеки та оборони",
        default_message: "Оберіть рівень розуміння сфери безпеки та оборони",
        possible_variants: {
            zero_level: "Не орієнтується у темі та не може пояснити базові поняття",
            first_level: "Розуміє загальні ідеї, але складно пояснювати або застосовувати їх",
            second_level: "Може пояснити основні поняття іншій людині та розуміє типові приклади",
            third_level: "Впевнено застосовує знання на практиці та може аналізувати ситуації",
            fourth_level: "Може критично оцінювати інформацію, знаходити помилки та аргументувати позицію"
        }
    },
    {
        /* 14 */
        name: "understanding_social",
        display_name: "Розуміння сфери соціального життя",
        default_message: "Оберіть рівень розуміння сфери соціального життя",
        possible_variants: {
            zero_level: "Не орієнтується у темі та не може пояснити базові поняття",
            first_level: "Розуміє загальні ідеї, але складно пояснювати або застосовувати їх",
            second_level: "Може пояснити основні поняття іншій людині та розуміє типові приклади",
            third_level: "Впевнено застосовує знання на практиці та може аналізувати ситуації",
            fourth_level: "Може критично оцінювати інформацію, знаходити помилки та аргументувати позицію"
        }
    },
    {
        /* 16 */
        name: "political_interest",
        display_name: "Зацікавленість політичним життям",
        default_message: "Оберіть рівень зацікавленості політичним життям",
        possible_variants: Object.fromEntries(
            Array.from({ length: 11 }, (_, i) => [
                String(i),
                String(i)
            ])
        )
    },
    {
        /* 17 */
        name: "media_positive_reaction",
        display_name: "Реакція на позитив у медіа",
        default_message: "Оберіть рівень впливу позитиву в медіа",
        possible_variants: Object.fromEntries(
            Array.from({ length: 11 }, (_, i) => [
                String(i),
                String(i)
            ])
        )
    },
    {
        /* 18 */
        name: "media_negative_reaction",
        display_name: "Реакція на негатив у медіа",
        default_message: "Оберіть рівень впливу негативу в медіа",
        possible_variants: Object.fromEntries(
            Array.from({ length: 11 }, (_, i) => [
                String(i),
                String(i)
            ])
        )
    },
    {
        /* 19 */
        name: "rating_perception",
        display_name: "Рівень сприйняття рейтингів",
        default_message: "Оберіть рівень сприйняття рейтингів",
        possible_variants: Object.fromEntries(
            Array.from({ length: 11 }, (_, i) => [
                String(i),
                String(i)
            ])
        )
    },
    {
        /* 20 */
        name: "experience_importance",
        display_name: "Важливість досвіду",
        default_message: "Оберіть рівень важливості досвіду",
        possible_variants: Object.fromEntries(
            Array.from({ length: 11 }, (_, i) => [
                String(i),
                String(i)
            ])
        )
    }
];