from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.utils.decorators import method_decorator
from django_ratelimit.decorators import ratelimit
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.request import Request

from src.api.v1.drf.auth.serializers import (
    ChangepasswordSerializer,
    ResetPasswordConfirmSerializer,
    ResetPasswordSerializer,
)
from src.api.v1.drf.schemas import ApiResponse
from src.apps.common.permissions import IsNotAuthenticated
from src.apps.users.services.emails import send_email

User = get_user_model()


class ChangePasswordView(CreateAPIView):
    serializer_class = ChangepasswordSerializer

    @method_decorator(ratelimit(key="ip", rate="5/m", method="POST", block=True))
    def post(self, request: Request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user = request.user
            User.objects.change_password(user, serializer.validated_data["new_password1"])
            return ApiResponse(status=status.HTTP_200_OK)

        return ApiResponse(data={"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(CreateAPIView):
    permission_classes = [IsNotAuthenticated]
    serializer_class = ResetPasswordSerializer

    @method_decorator(ratelimit(key="ip", rate="5/m", method="POST", block=True))
    def post(self, request: Request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user = User.objects.get(email=serializer.validated_data["email"])
            if user:
                code = User.objects.generate_email_token(user)
                send_email(
                    subject="Confirm deactivating of your account",
                    template="email/password_reset.html",
                    user=user,
                    code=code,
                )
                return ApiResponse(data={"code": code}, status=status.HTTP_200_OK)

        return ApiResponse(data={"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordConfirmView(CreateAPIView):
    permission_classes = [IsNotAuthenticated]
    serializer_class = ResetPasswordConfirmSerializer

    @method_decorator(ratelimit(key="ip", rate="5/m", method="POST", block=True))
    def post(self, request: Request, token: str):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user_id = cache.get(token)

            if not user_id:
                return ApiResponse(
                    data={"message": "Invalid or expired token"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user = User.objects.get(id=user_id)
            User.objects.change_password(user, serializer.validated_data["new_password1"])
            cache.delete(token)
            return ApiResponse(status=status.HTTP_200_OK)

        return ApiResponse(data={"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
