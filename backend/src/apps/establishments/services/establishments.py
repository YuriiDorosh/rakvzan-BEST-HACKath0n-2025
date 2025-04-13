from abc import ABC, abstractmethod
from typing import List, Optional

from django.contrib.auth.models import User
from django.core.files.uploadedfile import UploadedFile
from django.db.models import Q
from django.shortcuts import get_object_or_404
from src.apps.establishments.entities import (
    EstablishmentEntity,
    EstablishmentPhotoEntity,
    EstablishmentSimpleEntity,
)
from src.apps.establishments.models.establishments import \
    Establishment as EstablishmentModel
from src.apps.establishments.models.establishments import \
    EstablishmentPhoto as EstablishmentPhotoModel
import requests


class EstablishmentPhotoService(ABC):
    """Service for managing establishment photos."""

    @abstractmethod
    def get_photo_by_id(self, photo_id: int) -> Optional[EstablishmentPhotoEntity]:
        """Get a photo by its ID."""

    @abstractmethod
    def get_photos_by_establishment_id(self, establishment_id: int) -> List[EstablishmentPhotoEntity]:
        """Get all photos for a specific establishment."""

    @abstractmethod
    def create_photos(self, establishment_id: int, photo_files: List[UploadedFile]) -> List[EstablishmentPhotoEntity]:
        """Create new photos for an establishment from the list of
        UploadedFile."""

    @abstractmethod
    def delete_photo(self, photo_id: int) -> bool:
        """Delete a photo by its ID."""


class ORMEstablishmentPhotoService(EstablishmentPhotoService):
    """Implementation of EstablishmentPhotoService using Django ORM."""

    def get_photo_by_id(self, photo_id: int) -> Optional[EstablishmentPhotoEntity]:
        try:
            photo_obj = EstablishmentPhotoModel.objects.get(pk=photo_id)
            return photo_obj.to_entity()
        except EstablishmentPhotoModel.DoesNotExist:
            return None

    def get_photos_by_establishment_id(self, establishment_id: int) -> List[EstablishmentPhotoEntity]:
        photos_qs = EstablishmentPhotoModel.objects.filter(establishment_id=establishment_id)
        return [photo.to_entity() for photo in photos_qs]


    def create_photos(self, establishment_id: int, photo_files: List[UploadedFile]) -> List[EstablishmentPhotoEntity]:
        establishment = get_object_or_404(EstablishmentModel, pk=establishment_id)
        created_entities = []
        
        for file in photo_files:
            photo_obj = EstablishmentPhotoModel.objects.create(establishment=establishment, photo=file)
            created_entities.append(photo_obj.to_entity())
            
            file.seek(0)
            
            files = {"image": (file.name, file, file.content_type)}
            
            try:
                response = requests.post("http://fastapi:8001/analyze", files=files, timeout=10)
                response.raise_for_status()
                analysis_result = response.json().get("predictions", {})
                print(f"AI analysis result: {analysis_result}")
            except Exception as e:
                print(f"Error calling AI service for image analysis: {e}")
                analysis_result = {}
            
            updated = False
            for feature, flag in analysis_result.items():
                if flag and not getattr(establishment, feature, False):
                    setattr(establishment, feature, True)
                    updated = True
                    
            if updated:
                establishment.save()
        
        return created_entities

    def delete_photo(self, photo_id: int) -> bool:
        try:
            photo_obj = EstablishmentPhotoModel.objects.get(pk=photo_id)
            photo_obj.delete()
            return True
        except EstablishmentPhotoModel.DoesNotExist:
            return False


class EstablishmentService(ABC):
    """Service for managing establishments."""

    @abstractmethod
    def get_establishment_by_id(self, establishment_id: int) -> Optional[EstablishmentEntity]:
        """Get an establishment by its ID."""

    @abstractmethod
    def get_all_establishments(
        self,
        name: Optional[str] = None,
        latitude: Optional[float] = None,
        longitude: Optional[float] = None,
        address: Optional[str] = None,
        open_at_on_monday_to_friday: Optional[int] = None,
        open_at_on_saturday: Optional[int] = None,
        description: Optional[str] = None,
        owner_ids: Optional[str] = None,
        has_ramp: Optional[bool] = None,
        has_parking: Optional[bool] = None,
        has_bathroom: Optional[bool] = None,
        has_elevator: Optional[bool] = None,
        has_tactical_floor: Optional[bool] = None,
        has_signage: Optional[bool] = None,
        has_braille: Optional[bool] = None,
        has_audio: Optional[bool] = None,
        has_guide: Optional[bool] = None,
        has_sign_language: Optional[bool] = None,
        has_veterans_discounts: Optional[bool] = None,
        raiting: Optional[float] = None,
        is_active: Optional[bool] = None,
        is_deleted: Optional[bool] = None,
        is_verified: Optional[bool] = None,
        is_public: Optional[bool] = None,
        has_wifi: Optional[bool] = None,
    ) -> List[EstablishmentSimpleEntity]:
        """Get all establishments."""

    @abstractmethod
    def create_establishment(
        self,
        user: User,
        establishment_data: dict,
    ) -> EstablishmentEntity:
        """Create a new establishment."""

    @abstractmethod
    def update_establishment(self, establishment_id: int, establishment_data: dict) -> EstablishmentEntity:
        """Update an existing establishment."""

    @abstractmethod
    def delete_establishment(self, establishment_id: int) -> bool:
        """Delete an establishment by its ID."""


class ORMEstablishmentService(EstablishmentService):
    """Implementation of EstablishmentService using Django ORM."""

    def get_establishment_by_id(self, establishment_id: int) -> Optional[EstablishmentEntity]:
        try:
            establishment = EstablishmentModel.objects.get(id=establishment_id)
            return establishment.to_entity()
        except EstablishmentModel.DoesNotExist:
            return None

    def get_all_establishments(
        self,
        name: Optional[str] = None,
        latitude: Optional[float] = None,
        longitude: Optional[float] = None,
        address: Optional[str] = None,
        open_at_on_monday_to_friday: Optional[int] = None,
        open_at_on_saturday: Optional[int] = None,
        description: Optional[str] = None,
        owner_ids: Optional[str] = None,
        has_ramp: Optional[bool] = None,
        has_parking: Optional[bool] = None,
        has_bathroom: Optional[bool] = None,
        has_elevator: Optional[bool] = None,
        has_tactical_floor: Optional[bool] = None,
        has_signage: Optional[bool] = None,
        has_braille: Optional[bool] = None,
        has_audio: Optional[bool] = None,
        has_guide: Optional[bool] = None,
        has_sign_language: Optional[bool] = None,
        has_veterans_discounts: Optional[bool] = None,
        raiting: Optional[float] = None,
        is_active: Optional[bool] = None,
        is_deleted: Optional[bool] = None,
        is_verified: Optional[bool] = None,
        is_public: Optional[bool] = None,
        has_wifi: Optional[bool] = None,
    ) -> List[EstablishmentSimpleEntity]:
        filters = Q()
        try:
            if name:
                filters &= Q(name__icontains=name)

            if address:
                filters &= Q(address__icontains=address)

            if open_at_on_monday_to_friday:
                filters &= Q(open_at_on_monday_to_friday=open_at_on_monday_to_friday)

            if open_at_on_saturday:
                filters &= Q(open_at_on_saturday=open_at_on_saturday)

            if description:
                filters &= Q(description__icontains=description)

            if owner_ids:
                owner_ids_list = [int(owner_id) for owner_id in owner_ids.split(",")]
                filters &= Q(owner_id__in=owner_ids_list)

            if has_ramp is not None:
                filters &= Q(has_ramp=has_ramp)

            if has_parking is not None:
                filters &= Q(has_parking=has_parking)

            if has_bathroom is not None:
                filters &= Q(has_bathroom=has_bathroom)

            if has_elevator is not None:
                filters &= Q(has_elevator=has_elevator)

            if has_tactical_floor is not None:
                filters &= Q(has_tactical_floor=has_tactical_floor)

            if has_signage is not None:
                filters &= Q(has_signage=has_signage)

            if has_braille is not None:
                filters &= Q(has_braille=has_braille)

            if has_audio is not None:
                filters &= Q(has_audio=has_audio)

            if has_guide is not None:
                filters &= Q(has_guide=has_guide)

            if has_sign_language is not None:
                filters &= Q(has_sign_language=has_sign_language)

            if has_veterans_discounts is not None:
                filters &= Q(has_veterans_discounts=has_veterans_discounts)

            if raiting is not None:
                filters &= Q(raiting=raiting)

            if is_active is not None:
                filters &= Q(is_active=is_active)

            if is_deleted is not None:
                filters &= Q(is_deleted=is_deleted)

            if is_verified is not None:
                filters &= Q(is_verified=is_verified)

            if is_public is not None:
                filters &= Q(is_public=is_public)

            if has_wifi is not None:
                filters &= Q(has_wifi=has_wifi)

            if latitude is not None and longitude is not None:
                filters |= Q(latitude=latitude, longitude=longitude)

            establishments = (
                EstablishmentModel.objects.filter(filters)
                .prefetch_related(
                    "photos",
                    "comments",
                    "comments__images",
                    "comments__likes",
                )
                .select_related(
                    "owner",
                )
            )

            return [establishment.to_simple_entity() for establishment in establishments]
        except ValueError as e:
            # Handle the case where the conversion to int fails
            print(f"Invalid owner ID: {e}")
            return []
        except Exception as e:
            # Handle any other exceptions that may occur
            print(f"An error occurred: {e}")
            return []

    def create_establishment(
        self,
        user: User,
        establishment_data: dict,
    ) -> EstablishmentEntity:
        establishment = EstablishmentModel(owner=user, **establishment_data)
        establishment.save()
        return establishment.to_entity()

    def update_establishment(self, establishment_id: int, establishment_data: dict) -> EstablishmentEntity:
        try:
            establishment = EstablishmentModel.objects.get(id=establishment_id)
            for key, value in establishment_data.items():
                setattr(establishment, key, value)
            establishment.save()
            return establishment.to_entity()
        except EstablishmentModel.DoesNotExist:
            return None

    def delete_establishment(self, establishment_id: int) -> bool:
        try:
            establishment = EstablishmentModel.objects.get(id=establishment_id)
            establishment.delete()
            return True
        except EstablishmentModel.DoesNotExist:
            return False
