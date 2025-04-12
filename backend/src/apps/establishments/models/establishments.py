from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _
from src.apps.common.models import TimedAndUnixIdBaseModel
from src.apps.establishments.entities import EstablishmentEntity, EstablishmentPhotoEntity, EstablishmentSimpleEntity


class Establishment(TimedAndUnixIdBaseModel):
    latitude = models.FloatField(
        verbose_name=_("Latitude"),
        help_text=_("Latitude of the establishment"),
        null=True,
        blank=True,
    )
    longitude = models.FloatField(
        verbose_name=_("Longitude"),
        help_text=_("Longitude of the establishment"),
        null=True,
        blank=True,
    )
    name = models.CharField(
        max_length=255,
        verbose_name=_("Name"),
        help_text=_("Name of the student"),
        null=True,
        blank=True,
    )
    address = models.CharField(
        max_length=255,
        verbose_name=_("Address"),
        help_text=_("Address of the establishment"),
        null=True,
        blank=True,
    )
    open_at_on_monday_to_friday = models.IntegerField(
        verbose_name=_("Open At on Monday to Friday"),
        help_text=_("Open at on Monday to Friday"),
        null=True,
        blank=True,
    )
    open_at_on_saturday = models.IntegerField(
        verbose_name=_("Open At on Saturday"),
        help_text=_("Open at on Saturday"),
        null=True,
        blank=True,
    )
    phone = models.IntegerField(
        verbose_name=_("Phone"),
        help_text=_("Phone of the establishment"),
        null=True,
        blank=True,
    )
    contact_email = models.EmailField(
        max_length=255,
        verbose_name=_("Contact Email"),
        help_text=_("Contact email of the establishment"),
        null=True,
        blank=True,
    )
    website = models.URLField(
        max_length=255,
        verbose_name=_("Website"),
        help_text=_("Website of the establishment"),
        null=True,
        blank=True,
    )
    description = models.TextField(
        max_length=255,
        verbose_name=_("Description"),
        help_text=_("Description of the establishment"),
        null=True,
        blank=True,
    )
    owner = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        verbose_name=_("User"),
        help_text=_("User associated with the progress"),
    )
    has_ramp = models.BooleanField(
        default=False,
        verbose_name=_("Has Ramp"),
        help_text=_("Does the establishment have a ramp?"),
        null=True,
        blank=True,
    )
    has_parking = models.BooleanField(
        default=False,
        verbose_name=_("Has Parking"),
        help_text=_("Does the establishment have parking?"),
        null=True,
        blank=True,
    )
    has_bathroom = models.BooleanField(
        default=False,
        verbose_name=_("Has Bathroom"),
        help_text=_("Does the establishment have a bathroom?"),
        null=True,
        blank=True,
    )
    has_elevator = models.BooleanField(
        default=False,
        verbose_name=_("Has Elevator"),
        help_text=_("Does the establishment have an elevator?"),
        null=True,
        blank=True,
    )
    has_tactical_floor = models.BooleanField(
        default=False,
        verbose_name=_("Has Tactical Floor"),
        help_text=_("Does the establishment have a tactical floor?"),
        null=True,
        blank=True,
    )
    has_signage = models.BooleanField(
        default=False,
        verbose_name=_("Has Signage"),
        help_text=_("Does the establishment have signage?"),
        null=True,
        blank=True,
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
        null=True,
        blank=True,
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
    has_wifi = models.BooleanField(
        default=False,
        verbose_name=_("Has WiFi"),
        help_text=_("Does the establishment have WiFi?"),
    )
    
    class Meta:
        db_table = "establishments_establishment"
        verbose_name = _("Establishment")
        verbose_name_plural = _("Establishments")
        
    def __str__(self) -> str:
        return f"{self.name}"
    
    def to_entity(self) -> EstablishmentEntity:
        return EstablishmentEntity(
            id=self.id,
            latitude=self.latitude,
            longitude=self.longitude,
            name=self.name,
            address=self.address,
            phone_number=self.phone,
            email=self.contact_email,
            website=self.website,
            open_at_on_monday_to_friday=self.open_at_on_monday_to_friday,
            open_at_on_saturday=self.open_at_on_saturday,
            description=self.description,
            owner_name=self.owner.username,
            has_ramp=self.has_ramp,
            has_parking=self.has_parking,
            has_bathroom=self.has_bathroom,
            has_elevator=self.has_elevator,
            has_wifi=self.has_wifi,
            has_tactical_floor=self.has_tactical_floor,
            has_signage=self.has_signage,
            has_braille=self.has_braille,
            has_audio=self.has_audio,
            has_guide=self.has_guide,
            has_sign_language=self.has_sign_language,
            has_veterans_discounts=self.has_veterans_discounts,
            raiting=self.raiting,
            is_active=self.is_active,
            is_deleted=self.is_deleted,
            is_public=self.is_public,
            photos=[photo.to_entity() for photo in self.photos.all()],
            comments=[comment.to_entity() for comment in self.comments.all()],
        )
        
    def to_simple_entity(self) -> EstablishmentSimpleEntity:
        return EstablishmentSimpleEntity(
                id=self.id,
                latitude=self.latitude,
                longitude=self.longitude,
                name=self.name,
                address=self.address,
                open_at_on_monday_to_friday=self.open_at_on_monday_to_friday,
                open_at_on_saturday=self.open_at_on_saturday,
                owner_name=self.owner.username,
            )
    
    
class EstablishmentPhoto(TimedAndUnixIdBaseModel):
    establishment = models.ForeignKey(
        to=Establishment,
        on_delete=models.CASCADE,
        related_name="photos",
        verbose_name=_("Establishment"),
        help_text=_("Establishment associated with the photo"),
    )
    photo = models.ImageField(
        upload_to="establishments/photos/",
        verbose_name=_("Photo"),
        help_text=_("Photo of the establishment"),
    )

    class Meta:
        db_table = "establishments_establishment_photo"
        verbose_name = _("Establishment Photo")
        verbose_name_plural = _("Establishment Photos")
        
    def __str__(self) -> str:
        return f"Photo of {self.establishment.name}"

    def to_entity(self) -> EstablishmentPhotoEntity:
        return EstablishmentPhotoEntity(
            id=self.id,
            photo_url=self.photo.url,
        )