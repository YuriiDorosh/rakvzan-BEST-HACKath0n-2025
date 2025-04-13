from random import SystemRandom

from django.contrib.auth.models import BaseUserManager
from django.core.cache import cache
from rest_framework.request import Request

random = SystemRandom()


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def change_password(self, user, password):
        user.set_password(password)
        user.save(using=self._db)
        return user

    def generate_email_token(self, user):
        token = "".join([str(random.randint(0, 9)) for _ in range(6)])
        cache.set(token, user.id, timeout=1800)
        return token

    def blacklist_token(self, request: Request):
        cache.set(request.auth, "blacklisted", timeout=3600)
