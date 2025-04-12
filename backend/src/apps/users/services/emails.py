from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives


def send_email(user, code: str, template: str, subject: str):
    body = render_to_string(template, context={"user": user, "code": code})
    msg = EmailMultiAlternatives(subject, body, None, [user.email])
    msg.attach_alternative(body, "text/html")
    msg.send()
