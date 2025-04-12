from dataclasses import dataclass
from typing import List, Optional
from uuid import UUID


@dataclass
class CommentLikeEntity:
    id: int
    user_id: UUID
    user_name: str
    comment_id: int


@dataclass
class CommentImageEntity:
    id: int
    image_url: str


@dataclass
class CommentEntity:
    id: int
    establishment_id: int
    user_id: UUID
    user_name: str
    comment: str
    rating: Optional[float] = None
    images: Optional[List[CommentImageEntity]] = None
    likes: Optional[List[CommentLikeEntity]] = None


@dataclass
class EstablishmentPhotoEntity:
    id: int
    photo_url: str


@dataclass
class EstablishmentSimpleEntity:
    id: int
    name: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    address: Optional[str] = None
    open_at_on_monday_to_friday: Optional[int] = None
    open_at_on_saturday: Optional[int] = None
    owner_name: Optional[str] = None


@dataclass
class EstablishmentEntity:
    id: int
    name: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    address: Optional[str] = None
    phone_number: Optional[str] = None
    email: Optional[str] = None
    website: Optional[str] = None
    open_at_on_monday_to_friday: Optional[int] = None
    open_at_on_saturday: Optional[int] = None
    description: Optional[str] = None
    owner_name: Optional[str] = None
    has_ramp: Optional[bool] = None
    has_parking: Optional[bool] = None
    has_bathroom: Optional[bool] = None
    has_elevator: Optional[bool] = None
    has_wifi: Optional[bool] = None
    has_tactical_floor: Optional[bool] = None
    has_signage: Optional[bool] = None
    has_braille: Optional[bool] = None
    has_audio: Optional[bool] = None
    has_guide: Optional[bool] = None
    has_sign_language: Optional[bool] = None
    has_veterans_discounts: Optional[bool] = None
    raiting: Optional[float] = None
    is_active: Optional[bool] = None
    is_deleted: Optional[bool] = None
    is_public: Optional[bool] = None
    photos: Optional[List[EstablishmentPhotoEntity]] = None
    comments: Optional[List[CommentEntity]] = None
