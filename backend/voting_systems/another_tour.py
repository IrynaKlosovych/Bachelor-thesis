from abc import ABC, abstractmethod
from uuid import UUID


class AnotherTour(ABC):
    @abstractmethod
    def need_another_tour(self, pass_num: float, candidate_result: dict[UUID, float]):
        pass

    @abstractmethod
    def next_calculation(self, tour_num:int, voters_by_regions, candidates):
        pass
