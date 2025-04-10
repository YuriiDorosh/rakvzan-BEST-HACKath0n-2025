import os.path

from src.config.settings.components.boilerplate import BASE_DIR


# STATIC_DIR = BASE_DIR

STATIC_URL = "static/"

# STATIC_ROOT = os.path.join(STATIC_DIR.parent.parent, "static/")
STATIC_DIR = os.path.join(BASE_DIR, "static")
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
print(STATIC_ROOT)
print(STATIC_DIR)

if not os.path.exists(STATIC_ROOT):
    os.makedirs(STATIC_ROOT)

if not os.path.exists(STATIC_DIR):
    os.makedirs(STATIC_DIR)

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]
