from uuid import uuid4

from django.test import SimpleTestCase

from voting_systems.majoritarian.fptp import FPTP
from tests.helpers import make_voter

class FPTPTests(SimpleTestCase):
    def test_fptp_simple_winner(self):
        A, B, C = uuid4(), uuid4(), uuid4()

        voters_by_regions = {
            uuid4(): [
                make_voter({A: type("R", (), {"priority": 1})(), B: type("R", (), {"priority": 2})(), C: type("R", (), {"priority": 3})()}, people=40),
                make_voter({B: type("R", (), {"priority": 1})(), A: type("R", (), {"priority": 2})(), C: type("R", (), {"priority": 3})()}, people=35),
                make_voter({C: type("R", (), {"priority": 1})(), A: type("R", (), {"priority": 2})(), B: type("R", (), {"priority": 3})()}, people=25),
            ]
        }

        system = FPTP()

        result, updated_voters = system.calculate(voters_by_regions, [A, B, C])

        self.assertEqual(result[A], 40.0)
        self.assertEqual(result[B], 35.0)
        self.assertEqual(result[C], 25.0)

        self.assertAlmostEqual(sum(result.values()), 100.0)

        winner = max(result, key=result.get)
        self.assertEqual(winner, A)

        updated = system.set_voter_president_winner(updated_voters)

        for region_voters in updated.values():
            for v in region_voters:
                if v.president_candidate_similarity:
                    top = next(
                        cid for cid, r in v.president_candidate_similarity.items()
                        if r.priority == 1
                    )

                    self.assertIn(top, [A, B, C])