from rest_framework import serializers


class Enable2FASerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128, required=True)

    def validate(self, data):
        user = self.context["request"].user
        if not user.check_password(data["password"]):
            raise serializers.ValidationError("invalid password")
        return data


class Confirm2FASerializer(serializers.Serializer):
    token = serializers.CharField(max_length=6, required=True)
