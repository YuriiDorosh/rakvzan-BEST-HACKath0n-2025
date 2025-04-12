from django.template.loader import render_to_string
from django.contrib.auth import get_user_model
from src.apps.auth.models.user import User



def send_email(user: User, code: int, template: str, subject: str):
    body = render_to_string(
        template,
        {
            "user": user,
            "password": code,
        }
    )
    user.email_user(subject=subject, message=body)

