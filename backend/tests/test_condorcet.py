from uuid import uuid4

from django.test import SimpleTestCase

from voting_systems.majoritarian.condorcet import Condorcet
from tests.helpers import make_voter


class CondorcetTests(SimpleTestCase):
    def test_condorcet_cycle(self):
        A, B, C = uuid4(), uuid4(), uuid4()

        voters_by_regions = {
            uuid4(): [
                make_voter(
                    {
                        A: type("R", (), {"priority": 1})(),
                        B: type("R", (), {"priority": 2})(),
                        C: type("R", (), {"priority": 3})(),
                    },
                    people=40,
                ),
                make_voter(
                    {
                        B: type("R", (), {"priority": 1})(),
                        C: type("R", (), {"priority": 2})(),
                        A: type("R", (), {"priority": 3})(),
                    },
                    people=35,
                ),
                make_voter(
                    {
                        C: type("R", (), {"priority": 1})(),
                        A: type("R", (), {"priority": 2})(),
                        B: type("R", (), {"priority": 3})(),
                    },
                    people=25,
                ),
            ]
        }

        system = Condorcet()

        result_matrix, _ = system.calculate(
            voters_by_regions,
            [A, B, C],
        )

        self.assertEqual(
            result_matrix[A][B]["result"],
            "win",
        )

        self.assertEqual(
            result_matrix[B][C]["result"],
            "win",
        )

        self.assertEqual(
            result_matrix[C][A]["result"],
            "win",
        )
