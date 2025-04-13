from django.urls import include, path

urlpatterns = [
    path("auth/", include("src.api.v1.drf.auth.urls")),
    path("profiles/", include("src.api.v1.drf.profiles.urls")),

]
