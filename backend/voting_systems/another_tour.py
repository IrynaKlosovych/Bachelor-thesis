from abc import ABC, abstractmethod


class AnotherTour(ABC):
    @abstractmethod
    def need_another_tour(self, pass_num:int):
        pass