from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from django_ratelimit.decorators import ratelimit
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from src.api.v1.drf.auth.serializers import (
    LoginUserSerializer,
    UserAuthSerializer,
)
from src.apps.common.permissions import IsNotAuthenticated
from src.apps.users.services.emails import send_email
from src.apps.users.services.tokens import create_jwt_pair_for_user

User = get_user_model()


class RegistrateUserView(CreateAPIView):
    permission_classes = [IsNotAuthenticated]
    serializer_class = UserAuthSerializer

    @method_decorator(ratelimit(key="ip", rate="5/m", method="POST", block=True))
    def post(self, request: Request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            if serializer.is_valid(raise_exception=True):
                print(serializer.validated_data)
                user = serializer.save()
                code = User.objects.generate_email_token(user)
                send_email(
                    subject="Confirm your email",
                    template="email/email_verification.html",
                    user=user,
                    code=code,
                )
                return Response(
                    data={
                        "tokens": create_jwt_pair_for_user(user=user),
                        "code": code,
                    },
                    status=status.HTTP_201_CREATED,
                )

        except ValidationError as e:
            return Response(
                data={"message": e.detail},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                data={"message": f"Unexpected error: {e}"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class UserLoginView(CreateAPIView):
    permission_classes = [IsNotAuthenticated]
    serializer_class = LoginUserSerializer

    @method_decorator(ratelimit(key="ip", rate="5/m", method="POST", block=True))
    def post(self, request: Request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data
            return Response(data=create_jwt_pair_for_user(user), status=status.HTTP_200_OK)

        return Response(data={"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
