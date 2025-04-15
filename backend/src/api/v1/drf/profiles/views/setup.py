from django.contrib.auth import get_user_model
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from src.api.v1.drf.profiles.serializers import ProfileSerializer
from src.api.v1.drf.schemas import ApiResponse

User = get_user_model()


class ProfileViewSet(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = ProfileSerializer

    def retrieve(self, request, *args, **kwargs):
        """Get any user profile by ID (pk)"""
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return ApiResponse(data=serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        """Update any user profile by ID (pk)"""
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return ApiResponse(data=serializer.data, status=status.HTTP_200_OK)
        return ApiResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["get"], url_path="me")
    def me(self, request):
        """Get your own profile without needing to supply your ID"""
        serializer = self.get_serializer(request.user)
        return ApiResponse(data=serializer.data, status=status.HTTP_200_OK)
