from .password import ChangePasswordView, ResetPasswordConfirmView, ResetPasswordView
from .profile import (
    ConfirmEmailView,
    DeactivateUserConfirmView,
    DeactivateUserView,
    DeleteUserConfirmView,
    DeleteUserView,
    ResendEmailConfirmationView,
)
from .two_factor import Confirm2FAView, Enable2FAView, serve_qr_code
