import time

from django.db import (
    IntegrityError,
    models,
)


class TimedAndUnixIdBaseModel(models.Model):
    id = models.BigIntegerField( # noqa
        verbose_name='Unix Timestamp ID',
        unique=True,
        editable=False,
        primary_key=True,
        db_comment='Unix timestamp ID for the model',
    )
    created_at = models.DateTimeField(
        verbose_name='Created At',
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        verbose_name='Updated At',
        auto_now=True,
    )

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = int(time.time()) * 1000
            while True:
                try:
                    super().save(*args, **kwargs)
                    break
                except IntegrityError:
                    self.id += 1
        else:
            super().save(*args, **kwargs)

    class Meta:
        abstract = True
