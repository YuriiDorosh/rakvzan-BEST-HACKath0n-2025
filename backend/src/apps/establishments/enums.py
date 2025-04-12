from django.db import models


class CitiesEnum(models.TextChoices):
    """Enum for cities."""
    KYIV = "Kyiv"
    ODESA = "Odesa"
    LVIV = "Lviv"
    DNIPRO = "Dnipro"
    KHARKIV = "Kharkiv"
