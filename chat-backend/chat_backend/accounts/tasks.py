# from django.core.mail import send_mail
# from django.conf import settings
#
# from celery import shared_task
#
#
# @shared_task
# def send_confirm_message(url, recipient_mail):
#     email_from = settings.EMAIL_HOST_USER
#     subject = 'Confirm account creation'
#     message = f'To confirm account creation, please click on link below \n {url}'
#     send_mail(subject, message, email_from, [recipient_mail])
#
#
#
