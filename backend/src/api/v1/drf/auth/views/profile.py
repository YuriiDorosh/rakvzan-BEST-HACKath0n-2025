from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.utils.decorators import method_decorator
from django_ratelimit.decorators import ratelimit
from rest_framework import status
from rest_framework.generics import CreateAPIView, DestroyAPIView
from rest_framework.request import Request
from rest_framework.views import APIView
from src.api.v1.drf.auth.serializers import ConfirmUserSerializer
from src.api.v1.drf.schemas import ApiResponse
from src.apps.common.permissions import IsNotConfirmed
from rest_framework.permissions import IsAuthenticated

User = get_user_model()


class DeactivateUserView(CreateAPIView):
    serializer_class = ConfirmUserSerializer

    @method_decorator(ratelimit(key="ip", rate="5/m", method="POST", block=True))
    def post(self, request: Request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            User.objects.generate_email_token(request.user)
            return ApiResponse(status=status.HTTP_200_OK)

        return ApiResponse(data={"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class DeactivateUserConfirmView(APIView):
    @method_decorator(ratelimit(key="ip", rate="5/m", method="POST", block=True))
    def get(self, request: Request, token: str):
        try:
            user_id = cache.get(token)

            if not user_id or user_id != request.user.id:
                return ApiResponse(
                    data={"message": "Invalid or expired token"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user = User.objects.get(id=user_id)
            user.is_active = False
            cache.delete(token)

            return ApiResponse(status=status.HTTP_200_OK)

        except Exception:
            return ApiResponse(status=status.HTTP_400_BAD_REQUEST)


class ConfirmEmailView(APIView):
    permission_classes = [IsAuthenticated]

    @method_decorator(ratelimit(key="ip", rate="5/m", method="POST", block=True))
    def get(self, request: Request, token: str):
        try:
            user_id = cache.get(token)

            if not user_id:
                return ApiResponse(
                    data={"message": "Invalid or expired token"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user = User.objects.get(id=user_id)
            user.is_confirmed = True
            user.save()
            cache.delete(token)

            return ApiResponse(status=status.HTTP_200_OK)

        except Exception:
            return ApiResponse(status=status.HTTP_400_BAD_REQUEST)


class ResendEmailConfirmationView(APIView):
    permission_classes = [IsNotConfirmed]

    @method_decorator(ratelimit(key="ip", rate="5/m", method="POST", block=True))
    def get(self, request: Request):
        try:
            User.objects.generate_email_token(request.user)
            return ApiResponse(status=status.HTTP_200_OK)

        except Exception:
            return ApiResponse(status=status.HTTP_400_BAD_REQUEST)


class DeleteUserView(DestroyAPIView):
    serializer_class = ConfirmUserSerializer

    @method_decorator(ratelimit(key="ip", rate="5/m", method="POST", block=True))
    def post(self, request: Request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            User.objects.generate_email_token(request.user)
            return ApiResponse(status=status.HTTP_200_OK)

        return ApiResponse(status=status.HTTP_204_NO_CONTENT)


class DeleteUserConfirmView(APIView):
    @method_decorator(ratelimit(key="ip", rate="5/m", method="POST", block=True))
    def delete(self, request: Request, token: str):
        try:
            user_id = cache.get(token)

            if not user_id or user_id != request.user.id:
                return ApiResponse(
                    data={"message": "Invalid or expired token"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user = User.objects.get(id=user_id)
            user.delete()
            cache.delete(token)

            return ApiResponse(status=status.HTTP_204_NO_CONTENT)

        except Exception:
            return ApiResponse(status=status.HTTP_400_BAD_REQUEST)
