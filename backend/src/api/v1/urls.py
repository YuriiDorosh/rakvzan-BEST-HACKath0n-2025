from django.urls import include, path
from src.api.v1.ninja.urls import api

urlpatterns = [
    path("ninja/", api.urls),
    path("drf/", include("src.api.v1.drf.urls")),
]
