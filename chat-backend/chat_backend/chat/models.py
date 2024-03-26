from django.db import models
from django.conf import settings


class Chat(models.Model):
    chat_id = models.AutoField(primary_key=True)


class ChatLine(models.Model):
    chat_line_id = models.AutoField(primary_key=True)
    chat_id = models.ForeignKey(Chat, on_delete=models.CASCADE, null=False, related_name="history")
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    line_text = models.CharField(max_length=2048, null=False)
    created_at = models.DateTimeField(null=False)
    is_read = models.BooleanField(default=False)
    message_hash = models.CharField(max_length=255, null=False)

