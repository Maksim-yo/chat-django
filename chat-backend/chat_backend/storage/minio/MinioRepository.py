import io
from typing import List

import minio
from minio.commonconfig import CopySource

from storage.FileRepository import FileRepository
from storage.ObjectPath import ObjectPath
from storage.services.dto.StorageItemDTO import StorageDTO
from storage.utils import get_relative_path, get_name_of_folder
from storage.exceptions import MinioObjectError, NotCorrectTypeError


# TODO: get rid of hardcoded bucket_name
class MinioRepository(FileRepository):

    def __init__(self, client: minio.Minio):
        self.client = client
        self.bucket_name = 'test'
        self._create_bucket(self.bucket_name)

    def _create_bucket(self, bucket_name: str) -> None:
        try:
            if not self.client.bucket_exists(bucket_name):
                self.client.make_bucket(bucket_name)
        except Exception as e:
            raise MinioObjectError(e)

    def get_bucket_or_create(self):
        name = 'test'
        try:
            self._create_bucket(name)
        except Exception as e:
            raise MinioObjectError(e)
        finally:
            return name

    def is_bucket_exist(self, bucket_name: str):
        try:
            if self.client.bucket_exists(bucket_name):
                return True
            return False
        except Exception:
            raise MinioObjectError("Bucket with the same name already exists")

    def listFolderObjects(self, folder_path: ObjectPath) -> List[StorageDTO]:
        return self._listFolderObjects(folder_path, False)

    def listFolderObjectsRecursive(self, folder_path: ObjectPath) -> List[StorageDTO]:
        return self._listFolderObjects(folder_path, True)

    def _listFolderObjects(self, path: ObjectPath, recursive: bool):
        if not path.isFolder():
            raise NotCorrectTypeError()
        try:
            _objects = self.client.list_objects(path.getBucketName(), prefix=path.getPartialPath(), recursive=recursive)
            objects: List[StorageDTO] = []
            for obj in _objects:
                objects.append(self._object_mapper(obj))
            return objects
        except Exception as e:
            raise MinioObjectError(e)

    def _object_mapper(self, item) -> StorageDTO:
        return StorageDTO(
            path=item.object_name,
            bucket_name = item.bucket_name,
            hash = "",
            size = item.size,
            name=item.name,
        )

    def isSame(self, path: ObjectPath):
        pass

    def createFile(self, file_path: ObjectPath, name: str, data: io.BytesIO) -> StorageDTO:
        self.validateFilePath(file_path)
        try:
            result = self.client.put_object(self.bucket_name, file_path.getPartialPath(), data, data.getbuffer().nbytes)
            return StorageDTO(
                path=file_path.getPath(),
                bucket_name=self.bucket_name,
                size=data.getbuffer().nbytes,
                hash="",
                name=name,
            )
        except Exception as e:
            raise MinioObjectError(e)

    def createFolder(self, folder_path: ObjectPath) -> StorageDTO:
        self.validateFolderPath(folder_path)
        try:
            result = self.client.put_object(self.bucket_name, folder_path.getPartialPath(), io.BytesIO(b""), 0)
            return StorageDTO(
                path=folder_path.getPath(),
                bucket_name=self.bucket_name,
                size=0,
                chat_id=-1,
                hash="",
            )
        except Exception as e:
            raise MinioObjectError(e)

    def deleteFolder(self, folder_path: ObjectPath):
        self.validateFolderPath(folder_path)
        try:
            objects = self.client.list_objects(folder_path.getBucketName(), folder_path.getPartialPath(), True)
            for obj in objects:
                self.client.remove_object(obj.bucket_name, obj.object_name)
        except Exception as e:
            raise MinioObjectError(e)

    def deleteFile(self, file_path: ObjectPath):
        self.validateFilePath(file_path)
        try:
            self.client.remove_object(file_path.getBucketName(), file_path.getPartialPath())
        except Exception as e:
            raise MinioObjectError(e)

    def validateFilePath(self, file_path: ObjectPath):
        if file_path.isFolder():
            raise NotCorrectTypeError(f"Object with path: {file_path.getFullPath()} is not a file")

    def isObjectExist(self, file_path: ObjectPath):
        try:
            self.client.stat_object(file_path.getBucketName(), file_path.Path())
            return True
        except Exception:
            return False

    def getFileContent(self, file_path: ObjectPath) -> bytes:
        try:
            self.validateFilePath(file_path)
            response = self.client.get_object(file_path.getBucketName(), file_path.getPartialPath())
            return response.read()
        except Exception as e:
            raise MinioObjectError(e)
        finally:
            response.close()
            response.release_conn()


