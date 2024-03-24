from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
import logging

from accounts.models import ChatUser


@receiver(post_save, sender=User)
def create_user(sender, instance, created, **kwargs):
    try:
        if created:
            ChatUser.objects.create(user=instance)
    except Exception as e:
        logging.critical(f'Error creating chat user !\n{e}')

