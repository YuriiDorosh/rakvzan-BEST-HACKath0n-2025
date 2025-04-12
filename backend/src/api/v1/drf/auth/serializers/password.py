from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers


User = get_user_model()


class ChangepasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(max_length=128, required=True)
    new_password1 = serializers.CharField(max_length=128, required=True)
    new_password2 = serializers.CharField(max_length=128, required=True)

    def validate(self, data):
        user = self.context["request"].user
        if not user.check_password(data["old_password"]):
            raise serializers.ValidationError("invalid password")
        if data["old_password"] == data["new_password1"]:
            raise serializers.ValidationError("New password must be different from the old one")
        if data["new_password1"] != data["new_password2"]:
            raise serializers.ValidationError({"passwords didn't match"})
        validate_password(data["new_password1"])

        return data


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("user with this email does not exist")
        return value


class ResetPasswordConfirmSerializer(serializers.Serializer):
    new_password1 = serializers.CharField(max_length=128, required=True)
    new_password2 = serializers.CharField(max_length=128, required=True)

    def validate(self, data):
        if data["new_password1"] != data["new_password2"]:
            raise serializers.ValidationError("passwords didn't match")
        validate_password(data["new_password1"])
        return data
