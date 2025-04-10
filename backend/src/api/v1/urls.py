from django.urls import path
from src.api.v1.ninja.urls import api


urlpatterns = [
    path("auth/", api.urls),
]
