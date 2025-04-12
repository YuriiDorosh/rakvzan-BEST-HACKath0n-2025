from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _
from src.apps.common.models import TimedAndUnixIdBaseModel

from .enums import CitiesEnum
from .helpers import Photo


class Establishment(TimedAndUnixIdBaseModel):
    name = models.CharField(
        max_length=255,
        verbose_name=_("Name"),
        help_text=_("Name of the student"),
    )
    city = models.CharField(
        choices=CitiesEnum.choices(),
        max_length=255,
        verbose_name=_("City"),
        help_text=_("City of the establishment"),
    )
    address = models.CharField(
        max_length=255,
        verbose_name=_("Address"),
        help_text=_("Address of the establishment"),
    )
    phone = models.IntegerField(
        verbose_name=_("Phone"),
        help_text=_("Phone of the establishment"),
    )
    contact_email = models.EmailField(
        max_length=255,
        verbose_name=_("Contact Email"),
        help_text=_("Contact email of the establishment"),
    )
    website = models.URLField(
        max_length=255,
        verbose_name=_("Website"),
        help_text=_("Website of the establishment"),
    )
    description = models.TextField(
        max_length=255,
        verbose_name=_("Description"),
        help_text=_("Description of the establishment"),
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name=_("User"),
        help_text=_("User associated with the progress"),
    )
    has_ramp = models.BooleanField(
        default=False,
        verbose_name=_("Has Ramp"),
        help_text=_("Does the establishment have a ramp?"),
    )
    has_parking = models.BooleanField(
        default=False,
        verbose_name=_("Has Parking"),
        help_text=_("Does the establishment have parking?"),
    )
    has_bathroom = models.BooleanField(
        default=False,
        verbose_name=_("Has Bathroom"),
        help_text=_("Does the establishment have a bathroom?"),
    )
    has_elevator = models.BooleanField(
        default=False,
        verbose_name=_("Has Elevator"),
        help_text=_("Does the establishment have an elevator?"),
    )
    has_tactical_floor = models.BooleanField(
        default=False,
        verbose_name=_("Has Tactical Floor"),
        help_text=_("Does the establishment have a tactical floor?"),
    )
    has_signage = models.BooleanField(
        default=False,
        verbose_name=_("Has Signage"),
        help_text=_("Does the establishment have signage?"),
    )
    has_braille = models.BooleanField(
        default=False,
        verbose_name=_("Has Braille"),
        help_text=_("Does the establishment have braille?"),
    )
    has_audio = models.BooleanField(
        default=False,
        verbose_name=_("Has Audio"),
        help_text=_("Does the establishment have audio?"),
    )
    has_guide = models.BooleanField(
        default=False,
        verbose_name=_("Has Guide"),
        help_text=_("Does the establishment have a guide?"),
    )
    has_guide_dog = models.BooleanField(
        default=False,
        verbose_name=_("Has Guide Dog"),
        help_text=_("Does the establishment allow guide dogs?"),
    )
    has_sign_language = models.BooleanField(
        default=False,
        verbose_name=_("Has Sign Language"),
        help_text=_("Does the establishment have sign language?"),
    )
    has_veterans_discounts = models.BooleanField(
        default=False,
        verbose_name=_("Has Soldiers Discounts"),
        help_text=_("Does the establishment have soldiers discounts?"),
    )
    raiting = models.FloatField(
        default=0.0,
        verbose_name=_("Raiting"),
        help_text=_("Raiting of the establishment"),
    )

    is_active = models.BooleanField(
        default=True,
        verbose_name=_("Is Active"),
        help_text=_("Is the establishment active?"),
    )
    is_deleted = models.BooleanField(
        default=False,
        verbose_name=_("Is Deleted"),
        help_text=_("Is the establishment deleted?"),
    )
    is_verified = models.BooleanField(
        default=False,
        verbose_name=_("Is Verified"),
        help_text=_("Is the establishment verified?"),
    )
    is_public = models.BooleanField(
        default=False,
        verbose_name=_("Is Public"),
        help_text=_("Is the establishment public?"),
    )

    photos = models.ManyToManyField(
        Photo,
        verbose_name=_("Photos"),
        help_text=_("Photos of the establishment"),
    )
