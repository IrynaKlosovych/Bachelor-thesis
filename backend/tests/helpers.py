from uuid import uuid4

def make_voter(preferences, people=10, take_part=100.0):
    return type(
        "V",
        (),
        {
            "id": uuid4(),
            "president_candidate_similarity": preferences,
            "preferences": type(
                "P",
                (),
                {
                    "probability_take_part": take_part,
                },
            ),
            "details_descr": type(
                "D",
                (),
                {
                    "peopleCount": people,
                },
            ),
            "set_voting_systems_presidential": lambda self, system, data: None,
        },
    )()