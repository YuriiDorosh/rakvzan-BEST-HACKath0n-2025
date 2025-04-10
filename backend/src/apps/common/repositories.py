from abc import ABC, abstractmethod
from typing import Any, Generic, TypeVar, Optional
from django.db.models import QuerySet

T = TypeVar("T")


class AbstractORMRepository(ABC, Generic[T]):
    """Абстрактний клас для репозиторіїв."""

    @abstractmethod
    def get_all(self) -> QuerySet[T]:
        """Отримати всі записи."""
        pass

    @abstractmethod
    def get_by_id(self, obj_id: int) -> Optional[T]:
        """Отримати запис за ID."""
        pass

    @abstractmethod
    def create(self, **kwargs) -> T:
        """Створити новий запис."""
        pass

    @abstractmethod
    def update(self, obj_id: int, **kwargs) -> Optional[T]:
        """Оновити запис."""
        pass

    @abstractmethod
    def delete(self, obj_id: int) -> bool:
        """Видалити запис."""
        pass
