from rest_framework.permissions import BasePermission


class IsNotAuthenticated(BasePermission):
    """Allows access only to non-authenticated users."""

    def has_permission(self, request, view):
        return not request.user or not request.user.is_authenticated


class IsNotConfirmed(BasePermission):
    """Allows access only to users who have not confirmed their email."""

    def has_permission(self, request, view):
        return request.user and not request.user.is_confirmed


class IsNot2FA(BasePermission):
    """Allows access only to users who have not enable 2fa."""

    def has_permission(self, request, view):
        return request.user and not request.user.is_2fa


class Is2FA(BasePermission):
    """Allows access only to users who have enable 2fa."""

    def has_permission(self, request, view):
        return request.user and request.user.is_2fa
