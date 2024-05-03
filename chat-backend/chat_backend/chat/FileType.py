import enum
from storage.utils import get_extension


types = {
    "photo": ["png", "jpg"]
}


class FileType(enum.StrEnum):

    PHOTO = "photo"
    FILE = "file"

    @classmethod
    def file_type(cls, filename):
        extension = get_extension(filename)
        for key, value in types.items():
            for val in value:
                if extension == val:
                    return FileType(key)
        return cls.FILE