import os

import pyotp
from django.conf import settings
from django.http import FileResponse, Http404
from django.utils.decorators import method_decorator
from django_otp.plugins.otp_totp.models import TOTPDevice
from django_ratelimit.decorators import ratelimit
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from src.api.v1.drf.auth.serializers import (
    Confirm2FASerializer,
    Enable2FASerializer,
)
from src.apps.common.permissions import IsNot2FA
from src.apps.users.services.qr_code import generate_qr_code_file


class Enable2FAView(CreateAPIView):
    permission_classes = [IsNot2FA]
    serializer_class = Enable2FASerializer

    @method_decorator(ratelimit(key="ip", rate="5/m", method="POST", block=True))
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        device, created = TOTPDevice.objects.get_or_create(
            user=user,
            name="default",
            defaults={"key": "", "confirmed": False},
        )

        if created or not device.key:
            secret = pyotp.random_base32()
            device.key = secret
            device.confirmed = True
            device.save()
        else:
            secret = str(device.key).strip()

        try:
            pyotp.TOTP(secret).now()
        except Exception:
            secret = pyotp.random_base32()
            device.key = secret
            device.confirmed = True
            device.save()

        config_url = pyotp.TOTP(secret).provisioning_uri(name=user.email, issuer_name=settings.APP_NAME)

        filename, expiration = generate_qr_code_file(config_url)
        host = request.get_host()
        scheme = request.scheme
        file_url = f"{scheme}://{host}/api/v1/drf/auth/qr_codes/{filename}"

        return Response(
            {
                "file_url": file_url,
                "expires_at": expiration.isoformat(),
            },
            status=status.HTTP_200_OK,
        )


class Confirm2FAView(CreateAPIView):
    permission_classes = []
    serializer_class = Confirm2FASerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data["token"]

        user = request.user
        try:
            device = TOTPDevice.objects.get(user=user, name="default")
        except TOTPDevice.DoesNotExist:
            return Response({"error": "TOTP device not found."}, status=status.HTTP_404_NOT_FOUND)
        totp = pyotp.TOTP(device.key)
        if totp.verify(token):
            device.confirmed = True
            device.save()
            user.is_2fa = True
            user.save()
            return Response({"message": "2FA enabled successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)


def serve_qr_code(request, filename):
    temp_dir = "/tmp/qr_codes"
    file_path = os.path.join(temp_dir, filename)
    if os.path.exists(file_path):
        return FileResponse(open(file_path, "rb"), content_type="image/png")
    raise Http404("QR code not found")
