from django.urls import include, path
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection


class HealthCheckAPIView(APIView):
    """
    Simple healthcheck endpoint to verify server and database status.
    """

    def get(self, request, *args, **kwargs):
        try:
            # Check database connection
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")  # Test query

            return Response(
                {"status": "ok", "database": "connected"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"status": "error", "database": "disconnected", "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

urlpatterns = [
    path("v1/healthcheck/", HealthCheckAPIView.as_view(), name="healthcheck"),
    path("v1/", include("src.api.v1.urls")),
]
