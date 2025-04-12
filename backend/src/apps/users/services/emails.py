from django.template.loader import render_to_string


def send_email(user, code: str, template: str, subject: str):
    body = render_to_string(
        template,
        context={
            "user": user,
            "code": code,
        }
    )
    user.email_user(subject=subject, message=body)
