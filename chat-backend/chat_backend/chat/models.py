from django.db import models
from django.conf import settings
import io
from PIL import Image, ImageFilter
from django.db.models.signals import post_save
import os
import sys

class Chat(models.Model):
    chat_id = models.AutoField(primary_key=True)
    # TODO: Add constrain for uniqueness
    chat_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="user_chats")


class File(models.Model):
    name = models.CharField(max_length=50)
    size = models.IntegerField()
    file_hash = models.CharField(max_length=20)
    file_type = models.CharField(max_length=20)
    preview = models.BinaryField(null=True)              # For images only

    def save(self, *args, **kwargs):
       if "image" in self.file_type:
           try:
               data = io.BytesIO(self.preview)
               before = data.getbuffer().nbytes
               image = Image.open(data)
               # if image.mode == "P" or image.mode == "1":
               # image.thumbnail([sys.maxsize, 300])
               image = image.convert("RGB")
               image =image.resize((300, 300), resample=Image.Resampling.LANCZOS)
               image = image.filter(ImageFilter.BoxBlur(10))

               new_image = io.BytesIO()
               image.save(new_image, quality=1,optimize=True, format="JPEG")
               after = new_image.getbuffer().nbytes

               self.preview = new_image.getvalue()

           except Exception as e:
               # Handle any errors that might occur during image processing
                   print(f"Error processing image: {e}")
       super(File, self).save(*args, **kwargs)



class ChatLine(models.Model):
    chat_line_id = models.AutoField(primary_key=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, null=False, related_name="history")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    line_text = models.CharField(max_length=2048, null=False)
    file = models.ForeignKey(File, null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(null=False)
    is_read = models.BooleanField(default=False)
    message_hash = models.CharField(max_length=255, null=False)

