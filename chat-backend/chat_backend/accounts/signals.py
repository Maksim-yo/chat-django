from django.db.models.signals import post_save
from django.dispatch import receiver
import logging
from io import BytesIO
from PIL import Image
import numpy as np

from accounts.models import ChatUser
from randimage import get_random_image
import storage.config as storage_config


def create_random_image():
    img_size = (128, 128)
    img = get_random_image(img_size)
    byte_stream = BytesIO()
    img_normalized = (img * 255).astype(np.uint8)
    image = Image.fromarray(img_normalized)
    image.save(byte_stream, format="JPEG")
    byte_stream.seek(0)

    return byte_stream.read()


@receiver(post_save, sender=ChatUser)
def create_user(sender, instance, created, **kwargs):
    try:
        if created:
            image = create_random_image()
            file_hash = storage_config.file_service.upload_file(f"{instance.id}/", f"user_avatar_{instance.id}", data=image)
            instance.avatar = file_hash
            instance.save()
    except Exception as e:
        logging.critical(f'Error creating chat user !\n{e}')

