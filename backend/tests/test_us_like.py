from uuid import uuid4

from django.test import SimpleTestCase

from voting_systems.majoritarian.us_like import USLike
from tests.helpers import make_voter


class USLikeTests(SimpleTestCase):

    def test_us_like_basic_election(self):
        A, B, C = uuid4(), uuid4(), uuid4()

        region1 = type("R", (), {"id": uuid4(), "seats": 10})()
        region2 = type("R", (), {"id": uuid4(), "seats": 5})()

        voters_by_regions = {
            region1.id: [
                make_voter(
                    {
                        A: type("R", (), {"priority": 1})(),
                        B: type("R", (), {"priority": 2})(),
                        C: type("R", (), {"priority": 3})(),
                    },
                    people=60,
                ),
                make_voter(
                    {
                        A: type("R", (), {"priority": 1})(),
                    },
                    people=40,
                ),
            ],

            region2.id: [
                make_voter(
                    {
                        B: type("R", (), {"priority": 1})(),
                        A: type("R", (), {"priority": 2})(),
                        C: type("R", (), {"priority": 3})(),
                    },
                    people=70,
                ),
                make_voter(
                    {
                        B: type("R", (), {"priority": 1})(),
                    },
                    people=30,
                ),
            ],
        }

        system = USLike()

        results, voters, winners_by_region = system.calculate(
            voters_by_regions,
            [A, B, C],
            [region1, region2],
        )

        self.assertEqual(winners_by_region[region1.id], A)
        self.assertEqual(winners_by_region[region2.id], B)

        self.assertEqual(results[A], 10.0)
        self.assertEqual(results[B], 5.0)

        self.assertNotIn(C, results)


    def test_us_like_votes_are_region_based(self):
        A, B = uuid4(), uuid4()

        region1 = type("R", (), {"id": uuid4(), "seats": 3})()
        region2 = type("R", (), {"id": uuid4(), "seats": 7})()

        voters_by_regions = {
            region1.id: [
                make_voter({A: type("R", (), {"priority": 1})()}, people=100),
            ],
            region2.id: [
                make_voter({B: type("R", (), {"priority": 1})()}, people=100),
            ],
        }

        system = USLike()

        results, _, winners_by_region = system.calculate(
            voters_by_regions,
            [A, B],
            [region1, region2],
        )

        self.assertEqual(winners_by_region[region1.id], A)
        self.assertEqual(winners_by_region[region2.id], B)

        self.assertEqual(results[A], 3.0)
        self.assertEqual(results[B], 7.0)