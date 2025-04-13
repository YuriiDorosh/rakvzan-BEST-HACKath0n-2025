from rest_framework import serializers
from django.contrib.auth import get_user_model
from .comments import CommentSerializer


User = get_user_model()


from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    comments_count = serializers.IntegerField(source="comments.count", read_only=True)

    class Meta:
        model = User
        fields = ("email", "username", "first_name", "last_name", "id",             "comments",
            "comments_count",)
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
            "email": {"read_only": True},
            "username": {"read_only": True},
            "id": {"read_only": True},

        }
