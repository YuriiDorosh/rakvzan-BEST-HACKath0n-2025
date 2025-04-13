from rest_framework import serializers
from src.apps.establishments.models import Comment, Establishment


class EstablishmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establishment
        fields = [
            "id",
            "name",
            "description",
            "address",
            "latitude",
            "longitude",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "name",
            "description",
            "address",
            "latitude",
            "longitude",
            "created_at",
            "updated_at",
        ]


class CommentSerializer(serializers.ModelSerializer):
    establishment = EstablishmentSerializer(read_only=True)

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
            "establishment",

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
            "establishment",
        ]
