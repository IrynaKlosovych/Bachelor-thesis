from pathlib import Path

import generation_data as gn
import numpy as np

Path("data").mkdir(exist_ok=True)
rng = np.random.default_rng(42)


# ── Voter generator ───────────────────────────────────────────────────────────
def generate_voter_base(index: int) -> dict:
    age = rng.choice(gn.AGE_GROUPS, p=[0.20, 0.30, 0.28, 0.22])
    sex = rng.choice(gn.SEX, p=[0.54, 0.46])

    edu = rng.choice(gn.EDUCATIONS, p=[0.20, 0.35, 0.15, 0.30])
    econ_st = rng.choice(gn.ECON_STATUS, p=[0.22, 0.18, 0.16, 0.30, 0.10, 0.04])
    fin_ind = rng.choice(gn.FIN_INDEPENDENT, p=[0.15,0.20, 0.08, 0.19, 0.38])

    age_idx = gn.AGE_GROUPS.index(age)
    edu_idx = gn.EDUCATIONS.index(edu)

    und_econ = rng.choice(gn.UNDERSTANDING, p=[0.10, 0.25, 0.30, 0.25, 0.10])
    und_safety = rng.choice(gn.UNDERSTANDING, p=[0.08, 0.22, 0.32, 0.28, 0.10])
    und_social = rng.choice(gn.UNDERSTANDING, p=[0.10, 0.25, 0.30, 0.25, 0.10])
    und_map = {und: index for index, und in enumerate(gn.UNDERSTANDING)}

    return {
        "voter_id": index,
        "age": age,
        "sex": sex,
        "nationality": rng.choice(gn.NATIONALITIES, p=[0.80, 0.20]),
        "identity": rng.choice(gn.IDENTITIES, p=[0.35, 0.45, 0.20]),
        "religion": int(np.clip(rng.normal(4, 2.5), 0, 10)),
        "education": edu,
        "economic_status": econ_st,
        "finance_independent": fin_ind,
        "interest_econ": int(np.clip(rng.normal(6 - age_idx * 0.4, 2), 0, 10)),
        "interest_safety": int(np.clip(rng.normal(5 + age_idx * 0.7, 2), 0, 10)),
        "interest_social": int(
            np.clip(rng.normal(5 + (1 if sex == "Жіноча" else 0), 2), 0, 10)
        ),
        "understanding_econ": und_econ,
        "understanding_safety": und_safety,
        "understanding_social": und_social,
        "und_econ_num": und_map[und_econ],
        "und_safety_num": und_map[und_safety],
        "und_social_num": und_map[und_social],
        "safety_region": int(np.clip(rng.normal(3.0, 1.2), 1, 5)),
        "political_interest": int(np.clip(rng.normal(5 + edu_idx * 0.4, 2.5), 0, 10)),
        "media_positive_reaction": int(
            np.clip(rng.normal(5 - edu_idx * 0.4, 2), 0, 10)
        ),
        "media_negative_reaction": int(
            np.clip(rng.normal(6 - edu_idx * 0.3, 2), 0, 10)
        ),
        "rating_perception": int(np.clip(rng.normal(5, 2), 0, 10)),
        "experience_importance": int(np.clip(rng.normal(6, 2), 0, 10)),
    }
