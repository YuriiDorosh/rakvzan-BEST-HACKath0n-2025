import os
from src.config.settings.components.boilerplate import BASE_DIR
import environ


env = environ.Env()
environ.Env.read_env(BASE_DIR / '.env')

LOGGING_DIR_DJANGO = BASE_DIR.parent / "logs" / "django"
if not LOGGING_DIR_DJANGO.exists():
    LOGGING_DIR_DJANGO.mkdir(parents=True, exist_ok=True)

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "[%(asctime)s] [%(levelname)s] [%(process)d] [%(threadName)s] [%(name)s:%(lineno)d] %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S"
        },
        "simple": {
            "format": "[%(asctime)s] %(levelname)s %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S"
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "error_file": {
            "level": "ERROR",
            "class": "logging.handlers.TimedRotatingFileHandler",
            "formatter": "verbose",
            "filename": os.path.join(LOGGING_DIR_DJANGO, "error.log"),
            "when": "midnight",
            "backupCount": 7,
            "encoding": "utf-8",
        },
        "debug_file": {
            "level": "DEBUG",
            "class": "logging.handlers.TimedRotatingFileHandler",
            "formatter": "verbose",
            "filename": os.path.join(LOGGING_DIR_DJANGO, "debug.log"),
            "when": "midnight",
            "backupCount": 7,
            "encoding": "utf-8",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["console", "error_file", "debug_file"],
            "level": "DEBUG",
            "propagate": True,
        },
        "django.server": {
            "handlers": ["console", "error_file", "debug_file"],
            "level": "INFO",
            "propagate": False,
        },
        'src.apps.common.middlewares': {
            'handlers': ['console', 'debug_file'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
    "root": {
        "handlers": ["console", "error_file", "debug_file"],
        "level": "ERROR",
    },
}

if env('USE_ELASTIC') == 1:
    LOGGING['loggers']['elasticapm'] = {
        'level': 'DEBUG',
        'handlers': ['console'],
        'propagate': False,
    }
        
        
        # 'elasticapm': {
        #     'level': 'DEBUG',
        #     'handlers': ['console'],
        #     'propagate': False,
        # },