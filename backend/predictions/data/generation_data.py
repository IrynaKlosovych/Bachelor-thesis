# ── Categories ────────────────────────────────────────────────────────────────
AGE_GROUPS = ["18-30", "31-45", "45-60", "60+"]
SEX = ["Чоловіча", "Жіноча"]
NATIONALITIES = ["Титульна нація", "Національна меншина"]
IDENTITIES = [
    "Однакова громадянська та етнічна",
    "Громадянська сильніша за етнічну",
    "Сильна етнічна ідентичність",
]

EDUCATIONS = [
    "9-11 класи",  # 0.20
    "Профтех/коледж",  # 0.35
    "Незакінчена вища",  # 0.15
    "Вища освіта",  # 0.30
]
ECON_STATUS = [
    "Низький",  # 0.22
    "Нижче середнього",  # 0.18
    "Середній",  # 0.16
    "Вище середнього",  # 0.30
    "Високий",  # 0.10
    "Заможний",  # 0.04
]
FIN_INDEPENDENT = [
    "Повністю залежний",  # 0.15
    "Переважно залежний",  # 0.20
    "Частково і так, і так",  # 0.08
    "Переважно самостійний",  # 0.19
    "Повністю самостійний",  # 0.38
]
UNDERSTANDING = [
    "Не орієнтується у темі та не може пояснити базові поняття",
    "Розуміє загальні ідеї, але складно пояснювати або застосовувати їх",
    "Може пояснити основні поняття іншій людині та розуміє типові приклади",
    "Впевнено застосовує знання на практиці та може аналізувати ситуації",
    "Може критично оцінювати інформацію, знаходити помилки та аргументувати позицію",
]

# ── Country snapshots used during training ────────────────────────────────────

COUNTRY_SNAPSHOTS = [
    # wartime
    {
        "war_status": 8,
        "economic_crisis": 6,
        "corruption_level": 7,
        "media_freedom": 4,
        "political_stability": 3,
    },
    # post-war recovery
    {
        "war_status": 2,
        "economic_crisis": 7,
        "corruption_level": 6,
        "media_freedom": 5,
        "political_stability": 4,
    },
    # peacetime stable
    {
        "war_status": 0,
        "economic_crisis": 2,
        "corruption_level": 4,
        "media_freedom": 7,
        "political_stability": 7,
    },
    # crisis authoritarian
    {
        "war_status": 5,
        "economic_crisis": 8,
        "corruption_level": 9,
        "media_freedom": 2,
        "political_stability": 2,
    },
]

COUNTRY_FIELDS = [
    "war_status",
    "economic_crisis",
    "corruption_level",
    "media_freedom",
    "political_stability",
]

TARGET_COLS = [
    "probability_take_part",
    "candidate_positive_importance",
    "candidate_negative_fair_importance",
    "like_easy_decision",
    "like_strong_leader_over_law",
    "understand_government_institutions",
    "every_person_is_expert",
    "person_or_government_importance",
    "believe_government_institutions",
]
