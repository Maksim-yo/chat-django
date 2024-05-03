import io

from storage.FileRepository import FileRepository
from storage.ObjectPathFactory import ObjectPathFactory
from storage.services.dao.StorageDAO import StorageDAO
from storage.services.dto.StorageItemDTO import StorageDTO
from storage.services.dto.FileDTO import FileDTO
from storage.exceptions import FileServiceError, ObjectExistError, NotCorrectTypeError


class FileService:

    def __init__(self, repository: FileRepository, storage: StorageDAO, object_path_factory: ObjectPathFactory):
        self.repository = repository
        self.storage = storage
        self.object_path_factory = object_path_factory

    def upload_file(self, path: str, file_name: str, data: bytes) -> str:
        try:
            path = self.object_path_factory.compose(obj_path=path + file_name)
            item = self.repository.createFile(path, file_name, io.BytesIO(data))
            return self.storage.create_object(item)
        except ObjectExistError:
            raise
        except Exception as e:
            raise FileServiceError(e)

    def download_file(self, file_hash: str) -> FileDTO:
        try:
            item: StorageDTO = self.storage.get_object(file_hash)
            path = self.object_path_factory.compose(bucket_name=item.bucket_name, obj_path=item.path)
            data = self.repository.getFileContent(path)
            return FileDTO(name=item.name, data=data, file_hash=item.hash, size=item.size)
        except ObjectExistError:
            raise
        except Exception as e:
            raise FileServiceError(f"Error occur during downloading file {e}")

    def delete_file(self, chat_id: int, file_hash: str):
        try:
            item: StorageDTO = self.storage.delete_object(chat_id, file_hash)
            path = self.object_path_factory.compose(chat_id=item.chat_id, bucket_name=item.bucket_name, obj_path=item.path)
            self.repository.deleteFile(path)
        except Exception as e:
            raise FileServiceError("Error occur during deleting file")

