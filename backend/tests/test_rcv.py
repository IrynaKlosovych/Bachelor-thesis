from uuid import uuid4

from django.test import SimpleTestCase

from voting_systems.majoritarian.rcv import RCV
from tests.helpers import make_voter


class RCVTests(SimpleTestCase):
    def test_rcv_majority_win(self):
        A, B, C = uuid4(), uuid4(), uuid4()

        voters_by_regions = {
            uuid4(): [
                make_voter({A: type("R", (), {"priority": 1})()}, people=60),
                make_voter({B: type("R", (), {"priority": 1})()}, people=25),
                make_voter({C: type("R", (), {"priority": 1})()}, people=15),
            ]
        }

        system = RCV()

        tours, voters = system.calculate(voters_by_regions, [A, B, C])

        self.assertIn("tour_1", tours)

        self.assertEqual(tours["tour_1"][A], 60.0)
        self.assertEqual(tours["tour_1"][B], 25.0)
        self.assertEqual(tours["tour_1"][C], 15.0)

        self.assertAlmostEqual(sum(tours["tour_1"].values()), 100.0)

        self.assertNotIn("tour_2", tours)

    def test_rcv_runoff_and_elimination(self):
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

        system = RCV()

        tours, voters = system.calculate(voters_by_regions, [A, B, C])

        self.assertIn("tour_1", tours)

        self.assertTrue(all(p < 50 for p in tours["tour_1"].values()))

        self.assertIn("tour_2", tours)

        self.assertEqual(len(tours["tour_2"]), 2)

        self.assertNotIn(C, tours["tour_2"])

        self.assertAlmostEqual(sum(tours["tour_2"].values()), 100.0)
        