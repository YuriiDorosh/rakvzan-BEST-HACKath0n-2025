from rest_framework import serializers
from src.apps.establishments.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            "id",
            "establishment_id",
            "comment",
            "raiting",
            "images",
            "likes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "establishment_id",
            "comment",
            "raiting",
            "images",
            "likes",
            "created_at",
            "updated_at",
        ]
