from abc import ABC, abstractmethod
from typing import List, Optional

from django.contrib.auth.models import User
from django.core.files.uploadedfile import UploadedFile
from django.shortcuts import get_object_or_404
from src.apps.establishments.entities import CommentEntity, CommentLikeEntity
from src.apps.establishments.models import Comment as CommentModel
from src.apps.establishments.models import CommentImage as CommentImageModel
from src.apps.establishments.models import CommentLike as CommentLikeModel


class CommentService(ABC):
    @abstractmethod
    def get_comments(
        self,
        establishment_id: Optional[int] = None,
        user_id: Optional[int] = None,
    ) -> List[CommentEntity]:
        """Get comments for an establishment"""

    @abstractmethod
    def create_comment(
        self,
        establishment_id: int,
        user: User,
        comment: str,
        rating: Optional[int],
        images: Optional[List[UploadedFile]] = None,
    ) -> CommentEntity:
        """Create a new comment for an establishment"""

    @abstractmethod
    def update_comment(
        self,
        comment_id: int,
        user: User,
        comment: str,
        rating: Optional[int],
    ) -> CommentEntity:
        """Update an existing comment"""

    @abstractmethod
    def like_comment(self, comment_id: int, user: User) -> CommentLikeEntity:
        """Like a comment"""

    @abstractmethod
    def unlike_comment(self, comment_id: int, user: User) -> None:
        """Unlike a comment"""

    @abstractmethod
    def delete_comment(self, comment_id: int, user: User) -> None:
        """Delete a comment"""

    @abstractmethod
    def delete_comment_image(self, comment_id: int, image_id: int) -> None:
        """Delete a comment image"""


class ORMCommentService(CommentService):
    def get_comments(
        establishment_id: Optional[int] = None,
        user_id: Optional[int] = None,
    ) -> List[CommentEntity]:
        """Get comments for an establishment"""
        if establishment_id:
            comments = CommentModel.objects.filter(establishment_id=establishment_id)
        if user_id:
            comments = comments.filter(user_id=user_id)
        if not establishment_id and not user_id:
            comments = CommentModel.objects.all()
        return [comment.to_entity() for comment in comments]

    def create_comment(
        self,
        establishment_id: int,
        user: User,
        comment: str,
        rating: Optional[int],
        images: Optional[List[UploadedFile]] = None,
    ) -> CommentEntity:
        """Create a new comment for an establishment"""
        comment_instance = CommentModel.objects.create(
            establishment_id=establishment_id,
            user=user,
            comment=comment,
            raiting=rating,
        )
        if images:
            for image in images:
                CommentImageModel.objects.create(comment=comment_instance, image=image)
        return comment_instance.to_entity()

    def update_comment(
        self,
        comment_id: int,
        user: User,
        comment: str,
        rating: Optional[int],
    ) -> CommentEntity:
        """Update an existing comment"""
        comment_instance = get_object_or_404(CommentModel, id=comment_id, user=user)
        comment_instance.comment = comment
        comment_instance.raiting = rating
        comment_instance.save()

        return comment_instance.to_entity()

    def like_comment(self, comment_id: int, user: User) -> CommentLikeEntity:
        """Like a comment"""
        comment = get_object_or_404(CommentModel, id=comment_id)
        like = CommentLikeModel.objects.create(comment=comment, user=user)
        return like.to_entity()

    def unlike_comment(self, comment_id: int, user: User) -> None:
        """Unlike a comment"""
        like = get_object_or_404(CommentLikeModel, comment_id=comment_id, user=user)
        like.delete()

    def delete_comment(self, comment_id: int, user: User) -> None:
        """Delete a comment"""
        comment = get_object_or_404(CommentModel, id=comment_id, user=user)
        comment.delete()

    def delete_comment_image(self, comment_id: int, image_id: int) -> None:
        """Delete a comment image"""
        image = get_object_or_404(CommentImageModel, id=image_id, comment_id=comment_id)
        image.delete()
