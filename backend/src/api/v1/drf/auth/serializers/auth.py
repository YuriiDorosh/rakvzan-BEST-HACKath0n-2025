import pyotp
from django.contrib.auth import get_user_model
from django.db.models import Q
from django_otp.plugins.otp_totp.models import TOTPDevice
from rest_framework import serializers

User = get_user_model()


class UserAuthSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(max_length=128, write_only=True, required=True)
    password2 = serializers.CharField(max_length=128, write_only=True, required=True)

    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("this email is already in use")
        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("this username is already in use")
        return value

    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError({"password2": "password fields didn't match"})
        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        password = validated_data.pop("password1")
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user


class LoginUserSerializer(serializers.Serializer):
    identifier = serializers.CharField(max_length=128, required=True)
    password = serializers.CharField(max_length=128, required=True)
    token = serializers.CharField(max_length=6, required=False, allow_blank=True)

    def validate(self, data):
        user = User.objects.filter(Q(username=data["identifier"]) | Q(email=data["identifier"])).first()

        if user is None or not user.check_password(data["password"]):
            raise serializers.ValidationError("Invalid credentials")

        if user.is_2fa:
            token = data.get("token")
            if not token:
                raise serializers.ValidationError("2FA token is required for this account")
            try:
                device = TOTPDevice.objects.get(user=user, name="default")
            except TOTPDevice.DoesNotExist:
                raise serializers.ValidationError("2FA device not found")
            totp = pyotp.TOTP(device.key)
            if not totp.verify(token):
                raise serializers.ValidationError("Invalid 2FA token")
        return user
