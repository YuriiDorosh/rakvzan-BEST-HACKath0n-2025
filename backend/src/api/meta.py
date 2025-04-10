from django.http import HttpRequest
from typing import Optional
from datetime import datetime
import pytz

def get_meta_data(request: HttpRequest, api_version: str = None):
    return {
        "timestamp": datetime.now(pytz.UTC).isoformat(),
        "api_version": api_version,
        "user_id": request.user.id if request.user and request.user.is_authenticated else None
    }