from pathlib import Path

import environ
from split_settings.tools import include


BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent

env = environ.Env()
environ.Env.read_env(BASE_DIR / '.env')


SECRET_KEY = env('DJANGO_SECRET_KEY', default='mysecretkey')

DEBUG = False

ALLOWED_HOSTS = env('ALLOWED_HOSTS', default='*').split(',')

config_folder = "components/"

config_files = [
    "api.py",
    "apps.py",
    "auth.py",
    "boilerplate.py",
    "celery.py",
    "database.py",
    "internationalization.py",
    "logging_comp.py",
    "media.py",
    "middleware.py",
    "static.py",
    "templates.py",
    "timezone.py",
]

if env('USE_ELASTIC') == 1:
    GRAPPELLI_INDEX_DASHBOARD = 'src.config.dashboard.CustomIndexDashboard'
    config_files.append("elastic.py")

include(*(config_folder + file for file in config_files))

