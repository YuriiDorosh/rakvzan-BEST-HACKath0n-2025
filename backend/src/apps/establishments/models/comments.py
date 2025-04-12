from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _
from src.apps.establishments.entities import (
    CommentEntity,
    CommentImageEntity,
    CommentLikeEntity,
)

User = get_user_model()


class Comment(models.Model):
    establishment = models.ForeignKey(
        to="Establishment",
        verbose_name=_("Establishment"),
        on_delete=models.CASCADE,
        related_name="comments",
    )
    user = models.ForeignKey(
        to=User,
        verbose_name=_("User"),
        on_delete=models.CASCADE,
        related_name="comments",
    )
    comment = models.TextField(
        max_length=1024,
        verbose_name=_("Comment"),
        help_text=_("Comment about the establishment"),
    )
    raiting = models.IntegerField(
        verbose_name=_("Raiting"),
        help_text=_("Raiting of the establishment"),
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = "Comment"
        verbose_name_plural = "Comments"
        ordering = ["-id"]
        db_table = "establishments_comments"

    def __str__(self):
        return f"Comment {self.id} on {self.establishment.name}"

    def to_entity(self) -> CommentEntity:
        return CommentEntity(
            id=self.id,
            establishment_id=self.establishment.id,
            user_id=self.user.id,
            user_name=self.user.username,
            comment=self.comment,
            rating=self.raiting,
            images=[image.to_entity() for image in self.images.all()],
            likes=[like.to_entity() for like in self.likes.all()],
        )


class CommentImage(models.Model):
    comment = models.ForeignKey(
        to=Comment,
        verbose_name=_("Comment"),
        on_delete=models.CASCADE,
        related_name="images",
    )
    image = models.ImageField(
        upload_to="comments/images/",
        verbose_name=_("Image"),
        help_text=_("Image of the comment"),
    )

    class Meta:
        verbose_name = "Comment Image"
        verbose_name_plural = "Comment Images"
        ordering = ["-id"]
        db_table = "establishments_comments_images"

    def __str__(self):
        return f"Image {self.id} for Comment {self.comment.id}"

    def to_entity(self) -> CommentImageEntity:
        return CommentImageEntity(
            id=self.id,
            image_url=self.image.url,
        )


class CommentLike(models.Model):
    comment = models.ForeignKey(
        to=Comment,
        verbose_name=_("Comment"),
        on_delete=models.CASCADE,
        related_name="likes",
    )
    user = models.ForeignKey(
        to=User,
        verbose_name=_("User"),
        on_delete=models.CASCADE,
        related_name="comment_likes",
    )

    class Meta:
        verbose_name = "Comment Like"
        verbose_name_plural = "Comment Likes"
        ordering = ["-id"]
        db_table = "establishments_comments_likes"

    def __str__(self):
        return f"Like {self.id} for Comment {self.comment.id}"

    def to_entity(self) -> CommentLikeEntity:
        return CommentLikeEntity(
            id=self.id,
            user_id=self.user.id,
            user_name=self.user.username,
            comment_id=self.comment.id,
        )
