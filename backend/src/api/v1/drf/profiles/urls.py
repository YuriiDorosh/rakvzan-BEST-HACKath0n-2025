from django.urls import include, path
from rest_framework.routers import DefaultRouter

import src.api.v1.drf.profiles.views as views

router = DefaultRouter()
router.register(r'', views.ProfileViewSet, basename='profile-setup')

urlpatterns = [
    path('', include(router.urls)),
]