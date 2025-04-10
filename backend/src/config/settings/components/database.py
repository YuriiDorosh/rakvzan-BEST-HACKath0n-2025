import environ

from src.config.settings.components.boilerplate import BASE_DIR

env = environ.Env()
environ.Env.read_env(BASE_DIR / '.env')

if env('USE_REPLICA') == 1:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': env('POSTGRES_DB'),
            'USER': env('POSTGRES_USER'),
            'PASSWORD': env('POSTGRES_PASSWORD'),
            'HOST': env('POSTGRES_HOST'),
            'PORT': env('POSTGRES_PORT'),
        },
        'replica1': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': env('POSTGRES_DB'),
            'USER': env('POSTGRES_USER'),
            # 'USER': 'replicator',
            'PASSWORD': env('POSTGRES_PASSWORD'),
            # 'PASSWORD': env('POSTGRES_REPLICATION_PASSWORD'),
            'HOST': 'postgres_replica1',
            'PORT': env('POSTGRES_PORT'),
        },
        'replica2': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': env('POSTGRES_DB'),
            'USER': env('POSTGRES_USER'),
            # 'USER': 'replicator',
            'PASSWORD': env('POSTGRES_PASSWORD'),
            # 'PASSWORD': env('POSTGRES_REPLICATION_PASSWORD'),
            'HOST': 'postgres_replica2',
            'PORT': env('POSTGRES_PORT'),
        },
    }
    DATABASE_ROUTERS = ['src.config.routers.ReadWriteRouter']

else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': env('POSTGRES_DB'),
            'USER': env('POSTGRES_USER'),
            'PASSWORD': env('POSTGRES_PASSWORD'),
            'HOST': env('POSTGRES_HOST'),
            'PORT': env('POSTGRES_PORT'),
        },
    }

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
