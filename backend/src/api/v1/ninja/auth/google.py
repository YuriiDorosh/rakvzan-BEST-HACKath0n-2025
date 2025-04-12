from django.conf import settings
from django.contrib.auth import get_user_model
from google.auth.transport import requests
from google.oauth2 import id_token
from ninja_extra import api_controller, permissions, route
from ninja_jwt.tokens import RefreshToken
from src.api.v1.drf.schemas import ApiResponse

User = get_user_model()


@api_controller("/auth/google", auth=None)
class GoogleAuthController:
    @route.post(
        "/google/",
        response=ApiResponse,
        auth=None,
        permissions=[permissions.AllowAny],
    )
    def google_login(request, payload: dict):
        token = payload.get("id_token")
        if not token:
            return {"error": "Missing Google ID token"}, 400

        try:
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.GOOGLE_CLIENT_ID)
        except ValueError:
            return {"error": "Invalid Google token"}, 401

        if idinfo.get("iss") not in [
            "accounts.google.com",
            "https://accounts.google.com",
        ]:
            return {"error": "Invalid issuer"}, 401

        email = idinfo.get("email")
        idinfo.get("name", "")
        if not email:
            return {"error": "Google token did not provide an email"}, 400

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "username": email.split("@")[0],  # or generate unique username from name/email
                "is_confirmed": True,
            },
        )
        if created:
            user.is_confirmed = True  # mark email as confirmed via Google
            user.save()
        else:
            if not user.is_confirmed:
                user.is_confirmed = True

            user.save()

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        data = {
            "access": access_token,
            "refresh": refresh_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username,
            },
        }
        return ApiResponse(data=data)
