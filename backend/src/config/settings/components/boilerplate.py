from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent


ROOT_URLCONF = 'src.config.urls'

WSGI_APPLICATION = 'src.config.wsgi.application'
ASGI_APPLICATION = 'src.config.asgi.application'