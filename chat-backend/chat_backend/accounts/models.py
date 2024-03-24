from django.db import models
from django.contrib.auth.models import User
from chat.models import Chat


class ChatUser(models.Model):
    user_chats = models.ManyToManyField(Chat)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False)
