from django.apps import AppConfig
from .FileType import FileType

class ChatConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "chat"

    type_folders = {

        FileType.PHOTO: "photo/",
        FileType.FILE: "file/"
    }
