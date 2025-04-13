import src.api.v1.drf.auth.views as views
from django.urls import path

urlpatterns = [
    # User
    path("register/", views.RegistrateUserView.as_view(), name="register"),
    path("login/", views.UserLoginView.as_view(), name="login"),
    path("google/", views.GoogleLoginView.as_view(), name="google-login"),
    # User password
    path("change-password/", views.ChangePasswordView.as_view(), name="change-password"),
    path("reset-password/", views.ResetPasswordView.as_view(), name="reset-password"),
    path(
        "reset-password-confirm/<str:token>/",
        views.ResetPasswordConfirmView.as_view(),
        name="reset-password-confirm",
    ),
    # Delete account
    path("delete-account/", views.DeleteUserView.as_view(), name="delete-account"),
    path(
        "delete-account-confirm/<str:token>/",
        views.DeleteUserConfirmView.as_view(),
        name="delete-account-confirm",
    ),
    # Deactivate account
    path(
        "deactivate-account/",
        views.DeactivateUserView.as_view(),
        name="deactivate-account",
    ),
    path(
        "deactivate-account-confirm/<str:token>/",
        views.DeactivateUserConfirmView.as_view(),
        name="deactivate-account-confirm",
    ),
    # Email confirmation
    path(
        "reset-confirmation-email/",
        views.ResendEmailConfirmationView.as_view(),
        name="reset-email",
    ),
    path(
        "confirm-email/<str:token>/",
        views.ConfirmEmailView.as_view(),
        name="confirm-email",
    ),
    # 2FA
    path("2fa/enable", views.Enable2FAView.as_view(), name="enable-2fa"),
    path("2fa/confirm", views.Confirm2FAView.as_view(), name="confirm-2fa"),
    path("qr_codes/<str:filename>/", views.serve_qr_code, name="qr-codes"),
]
