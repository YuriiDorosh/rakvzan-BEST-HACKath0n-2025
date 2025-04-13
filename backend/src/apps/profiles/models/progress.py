from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _
from src.apps.words.models import Word
from src.apps.common.models import TimedAndUnixIdBaseModel


class StudentWordProgress(TimedAndUnixIdBaseModel):
    user = models.ForeignKey(
        verbose_name=_("User"),
        to=User,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name="word_progresses",
    )
    word = models.ForeignKey(
        verbose_name=_("Word"),
        to=Word,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name="word_progresses",
    )
    is_learned = models.BooleanField(
        verbose_name=_("Is learned"),
        null=True,
        blank=True,
    )
    is_favorite = models.BooleanField(
        verbose_name=_("Is favorite"),
        null=True,
        blank=True,
    )
    learned_timestamp = models.DateTimeField(
        verbose_name=_("Learned timestamp"),
        null=True,
        blank=True,
    )
    last_reviewed_timestamp = models.DateTimeField(
        verbose_name=_("Last reviewed timestamp"),
        null=True,
        blank=True,
    )
    notes = models.TextField(
        verbose_name=_("Notes"),
        null=True,
        blank=True,
    )
    
    class Meta:
        db_table = "students_word_progress"
        verbose_name = _("Student Word Progress")
        verbose_name_plural = _("Student Word Progresses")
        
    def __str__(self) -> str:
        return f"{self.user} - {self.word}"
    