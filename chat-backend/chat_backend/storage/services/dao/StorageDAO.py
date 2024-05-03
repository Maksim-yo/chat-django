import datetime
from typing import List

from django.contrib.auth.models import User

from storage.models import StorageItem
from storage.services.dto.StorageItemDTO import StorageDTO
from storage.exceptions import ObjectExistError, NotCorrectTypeError
from storage.utils import path_hash, is_folder, get_relative_path, get_object_name
from storage.ObjectPathFactory import ObjectPathFactory

from chat.models import Chat


class StorageDAO:

    def __init__(self, object_path_factory: ObjectPathFactory):
        self.object_path_factory = object_path_factory

    def _orm_to_entity(self, item: StorageItem) -> StorageDTO:
        return StorageDTO(
            path=item.path,
            bucket_name=item.bucket,
            hash=item.hash,
            size=item.size,
            name=item.name,
        )

    def get_object(self, item_hash):
        item = StorageItem.objects.get(hash=item_hash)
        return self._orm_to_entity(item)
    def calculate_hash(self, path: str):
        return path_hash(path)

    def compose_path(self, parent_path: str, obj_path: str) -> str:
        return parent_path + '/' + obj_path

    def chat_objects_by_type(self, chat_id: int, items_type) -> List[StorageDTO]:
        chat = Chat.objects.get(pk=chat_id)

        items = StorageItem.objects.filter(chat=chat, type=items_type).order_by('-last_modified')
        objects = list(map(self._orm_to_entity, items))
        return objects

    def chat_objects_by_type_count(self, chat: Chat, items_type):
        return StorageItem.objects.filter(chat=chat, type=items_type).count()

    def create_object(self, item: StorageDTO) -> str:

        obj_path = self.object_path_factory.compose(obj_path=item.path, bucket_name=item.bucket_name).getFullPath()
        item_hash = self.calculate_hash(obj_path)

        item = StorageItem.objects.create(
            path=item.path,
            bucket=item.bucket_name,
            hash=item_hash,
            size=item.size,
            name=item.name,
        )
        return item_hash

    # TODO: create transaction
    def delete_object(self, chat_id: int, item_hash: str) -> StorageDTO:

        chat = Chat.objects.get(pk=chat_id)
        item = chat.items.filter(storage_item_hash=item_hash)
        item_dto = self._orm_to_entity(item)
        item.delete()
        return item_dto

