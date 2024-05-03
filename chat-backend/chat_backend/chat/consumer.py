import json
import base64

from channels.generic.websocket import AsyncJsonWebsocketConsumer
from datetime import datetime
from asgiref.sync import async_to_sync, sync_to_async

from accounts.models import ChatUser
from .models import Chat, ChatLine, File as FileModel
from .dto import *
import storage.config as config


class RoomConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.rooms = {}
        if self.scope["user"].is_anonymous:
            await self.close()
            return

        self.user = self.scope["user"]
        await self.accept("auth_protocol")
        await self.send_json("self.init_message()")
        init_msg = await self.init_message()
        for chat in init_msg.chats:
            room_group_name = "chat_%d" % chat.chat_id
            self.rooms[room_group_name] = chat
            self.channel_layer.group_add(room_group_name, self.channel_name)
        await self.send(json.dumps(init_msg, default=lambda o: o.__dict__))

    async def disconnect(self, close_code):
        for room_name in self.rooms.keys():
            self.channel_layer.group_discard(room_name, self.channel_name)

    async def createRoomIfNotExists(self, message):
        chat = Chat()
        user = await ChatUser.objects.aget(pk=message.peer_id)
        chat.chat_user_set.aadd(self.user, user)
        # ChatLine.objects.aadd()
        await chat.asave()
        room_group_name = "chat_%d" % chat.chat_id
        room = self.rooms.get(room_group_name, [])
        #
        # def create_default_folders(chat_id):
        #     config.folder_service.save_root_folder(chat_id)


    async def receive_json(self, content, **kwargs):
        message_type = content.get("type", None)
        try:

            match message_type:
                case "peer_message":
                    await self.send_message(content)

                case "peer_room":
                    await self.createRoomIfNotExists(content)

            # self.send_json({"message": message})
        except Exception as e:
            await self.send_json({"error": e})

    async def init_message(self):
        user = self.scope["user"]
        user_chats = await sync_to_async(lambda : user.user_chats)()
        chats_dto = []
        async for chat in user_chats.all():
            messages = []
            peers = []
            history = await sync_to_async(lambda : chat.history)()
            async for message in history.all():
                file: File = None
                file_obj = await sync_to_async(lambda : message.file)()
                if file_obj:
                    file = File(file_hash=file_obj.file_hash, file_name=file_obj.name, file_size=file_obj.size,
                                file_type=file_obj.file_type, preview=file_obj.preview)
                    file.preview = base64.b64encode(file.preview).decode()
                messages.append(MessageDto(message_hash=message.message_hash, line_text=message.line_text,
                                           is_read=message.is_read, chat_id=chat.chat_id, file=file))
            _peers = await sync_to_async(lambda : chat.chat_users)()
            async for peer in _peers.all():
                username = await sync_to_async(lambda: peer.username)()
                peers.append(PeerDto(username=username))
            chats_dto.append(ChatDto(chat_id=chat.chat_id, history=messages, peers=peers))

        message = InitialMessage(chats=chats_dto, peerName=self.scope["user"].username, peerId=self.scope["user"].id,
                                 timestamp=datetime.utcnow().second,
                                 type=MessageTypes.CODE_CHAT_INFO)
        return message


    async def save_message(self, message: ChatMessage):
        file: FileModel = None
        if message.message.file:
            file_message = message.message.file
            file = await FileModel.objects.aget(file_hash=file_message.file_hash)
        chat_obj = await Chat.objects.aget(pk=message.message.chat_id)
        chat = await ChatLine.objects.acreate(chat=chat_obj, user=self.user, line_text=message.message.line_text,
                                file=file, created_at=datetime.fromtimestamp(message.timestamp), is_read=message.message.is_read, message_hash=message.message.message_hash)
    async def send_message(self, event):
        message_file: File = None
        try:
            message_file = File(file_name=event["file"]["name"], file_hash=event["file"]["hash"],
                                file_size=event["file"]["size"], file_type=event["file"]["type"])
        except (KeyError, TypeError) as e:
            message_file = None
        message = ChatMessage(peerId=self.user.id, peerName=self.user.email, timestamp=event["timestamp"], type=event["type"],
                              message=MessageDto(message_hash=event["message_id"], line_text=event.get("line_text", ""),
                            chat_id=event["chat_id"], is_read=event.get("is_read", False), file=message_file))
        await self.save_message(message)
        room_group_name = "chat_%d" % message.message.chat_id

        await self.channel_layer.group_send(
            room_group_name,
            {
                "type": "chat_message",
                "message": json.dumps(message, default=lambda o: o.__dict__),
            }
        )

    async def chat_message(self, event):
        room_group_name = "chat_%d" % event["message"]["chat_id"]
        room = self.rooms.get(room_group_name, [])
        message = event["message"]
        room.append(message)
        await self.send_json(
            message,
        )
