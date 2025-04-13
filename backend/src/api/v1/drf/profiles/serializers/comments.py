from rest_framework import serializers
from src.apps.establishments.models import Comment, Establishment


class EstablishmentSerializer(serializers.ModelSerializer):
    first_image = serializers.SerializerMethodField()

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
            "first_image",
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
            "first_image"
        ]

    def get_first_image(self, obj):
        first_photo = obj.photos.first()
        return first_photo.photo.url if first_photo else None


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
