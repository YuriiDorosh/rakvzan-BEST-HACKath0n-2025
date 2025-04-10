import environ

from src.config.settings.components.boilerplate import BASE_DIR

env = environ.Env()
environ.Env.read_env(BASE_DIR / '.env')

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'src.apps.common.middlewares.DBLoggingMiddleware',
]


if env('USE_ELASTIC') == 1:
    MIDDLEWARE += ['src.apps.common.middlewares.ElasticApmMiddleware',]