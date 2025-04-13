from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class SetupProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "username", "first_name", "last_name", "id")
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
            "email": {"read_only": True},
            "username": {"read_only": True},
            "id": {"read_only": True},

        }
