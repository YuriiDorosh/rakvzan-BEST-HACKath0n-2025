from abc import ABC, abstractmethod
from typing import Generic, Optional, TypeVar

from django.db.models import QuerySet

T = TypeVar("T")


class AbstractORMRepository(ABC, Generic[T]):
    """Абстрактний клас для репозиторіїв."""

    @abstractmethod
    def get_all(self) -> QuerySet[T]:
        """Отримати всі записи."""

    @abstractmethod
    def get_by_id(self, obj_id: int) -> Optional[T]:
        """Отримати запис за ID."""

    @abstractmethod
    def create(self, **kwargs) -> T:
        """Створити новий запис."""

    @abstractmethod
    def update(self, obj_id: int, **kwargs) -> Optional[T]:
        """Оновити запис."""

    @abstractmethod
    def delete(self, obj_id: int) -> bool:
        """Видалити запис."""
