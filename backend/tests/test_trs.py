from uuid import uuid4

from django.test import SimpleTestCase

from voting_systems.majoritarian.trs import TRS
from tests.helpers import make_voter


class TRSTests(SimpleTestCase):

    def test_trs_majority_no_runoff(self):

        A, B, C = uuid4(), uuid4(), uuid4()

        voters_by_regions = {
            uuid4(): [
                make_voter({A: type("R", (), {"priority": 1})()}, people=60),
                make_voter({B: type("R", (), {"priority": 1})()}, people=25),
                make_voter({C: type("R", (), {"priority": 1})()}, people=15),
            ]
        }

        system = TRS()

        tours, voters = system.calculate(voters_by_regions, [A, B, C])

        self.assertIn("tour_1", tours)

        self.assertEqual(tours["tour_1"][A], 60.0)
        self.assertEqual(tours["tour_1"][B], 25.0)
        self.assertEqual(tours["tour_1"][C], 15.0)

        self.assertNotIn("tour_2", tours)


    def test_trs_runoff_top_two(self):
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

        system = TRS()

        tours, voters = system.calculate(voters_by_regions, [A, B, C])

        self.assertIn("tour_1", tours)

        self.assertIn("tour_2", tours)

        self.assertEqual(len(tours["tour_2"]), 2)

        self.assertAlmostEqual(sum(tours["tour_2"].values()), 100.0)

        self.assertEqual(set(tours["tour_2"].keys()), set(tours["tour_2"].keys()))


    def test_trs_need_another_tour_logic(self):
        system = TRS()

        A, B, C = uuid4(), uuid4(), uuid4()

        res = {
            A: 55.0,
            B: 30.0,
            C: 15.0,
        }

        need, top = system.need_another_tour(50, res)

        self.assertFalse(need)
        self.assertEqual(top, [])

        res = {
            A: 40.0,
            B: 35.0,
            C: 25.0,
        }

        need, top = system.need_another_tour(50, res)

        self.assertTrue(need)
        self.assertEqual(len(top), 2)


    def test_trs_next_calculation(self):
        A, B = uuid4(), uuid4()

        voters_by_regions = {
            uuid4(): [
                make_voter(
                    {
                        A: type("R", (), {"priority": 1})(),
                        B: type("R", (), {"priority": 2})(),
                    },
                    people=50,
                ),
                make_voter(
                    {
                        B: type("R", (), {"priority": 1})(),
                        A: type("R", (), {"priority": 2})(),
                    },
                    people=50,
                ),
            ]
        }

        system = TRS()

        voters_tours = {}

        result, _, voters_tours = system.next_calculation(
            2,
            voters_by_regions,
            [A, B],
            voters_tours,
        )

        self.assertEqual(set(result.keys()), {A, B})

        self.assertAlmostEqual(sum(result.values()), 100.0)