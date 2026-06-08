COUNTRY_COLS = [
    "war_status",
    "economic_crisis",
    "corruption_level",
    "media_freedom",
    "political_stability",
]

COUNTRY_DEFAULTS = {field: 5.0 for field in COUNTRY_COLS}
COUNTRY_RANGES = {col: (0.0, 10.0) for col in COUNTRY_COLS}

CAND_AXES = [
    "media_positive",
    "transparency",
    "program_simplicity",
    "leadership_strength",
    "institutional_competence",
    "anti_populism",
    "social_focus",
    "rule_of_law",
]

CAND_DEFAULTS = {
    "media_positive": 5.0,
    "transparency": 5.0,
    "program_simplicity": 5.0,
    "leadership_strength": 3.0,
    "institutional_competence": 5.0,
    "anti_populism": 5.0,
    "social_focus": 5.0,
    "rule_of_law": 5.0,
}

CAND_FIELD_RANGES = {
    "media_positive": (0, 10),
    "transparency": (0, 10),
    "program_simplicity": (0, 10),
    "leadership_strength": (1, 5),
    "institutional_competence": (0, 10),
    "anti_populism": (0, 10),
    "social_focus": (0, 10),
    "rule_of_law": (0, 10),
}
