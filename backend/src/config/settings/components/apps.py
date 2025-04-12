import os
import sys

import environ
from config.settings.components.boilerplate import BASE_DIR

env = environ.Env()
environ.Env.read_env(BASE_DIR / ".env")

DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

THIRD_PARTY = [
    # DCRF
    "channels",
    # DRF
    "rest_framework",
    "rest_framework.authtoken",
    "rest_framework_simplejwt",
    "django_extensions",
    "drf_yasg",
    # Cache
    "cachalot",
    # Ninja
    "ninja_extra",
    "ninja_jwt",
    # "totp",
    "django_otp",
    "django_otp.plugins.otp_totp",
]

if env("USE_ELASTIC") == 1:
    THIRD_PARTY += [
        # Elastic
        "elasticapm.contrib.django",
    ]

sys.path.insert(0, os.path.join(BASE_DIR, "apps"))


LOCAL_APPS = []

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY + LOCAL_APPS
