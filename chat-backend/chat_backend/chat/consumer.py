import json
import base64

from channels.generic.websocket import AsyncJsonWebsocketConsumer
from datetime import datetime
from asgiref.sync import async_to_sync, sync_to_async

from accounts.models import ChatUser
from .models import Chat, ChatLine, File as FileModel
from .dto import *
import pytz
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
                case MessageTypes.CODE_PEER_MESSAGE:
                    await self.send_json({"type":MessageTypes.CODE_MESSAGE_ACK, "message_hash": content["message_hash"],
                                          "chat_id": content["chat_id"]})
                    await self.send_message(content)

                case "peer_room":
                    await self.createRoomIfNotExists(content)

                case "create_room":
                    chat_id = await self.create_room(content)
                    await self.send_json({"type":MessageTypes.CODE_ROOM_CREATED, "chat_id": chat_id, "temp_id": content["chat_id"]})
                case "messages_read":
                    await self.messages_read(content)
            # self.send_json({"message": message})
        except Exception as e:
            await self.send_json({"error": e})

    async def create_room(self, message):
        chat = await Chat.objects.acreate()
        peers = message['peers']
        peer = None
        if peers[0] != self.user.email:
            peer = peers[0]
        else:
            peer = peers[1]
        peer_user = await ChatUser.objects.aget(email=peer)
        await chat.chat_users.aadd(self.user, peer_user)
        await chat.asave()
        return chat.chat_id
    # TODO: Optimize
    async def messages_read(self, message):
        room_group_name = "chat_%d" % message["chat_id"]
        message['type'] = MessageTypes.CODE_PEER_READ
        messages_hash = list(map(lambda x: x['message_hash'], message['messages']))
        chat_users = await sync_to_async(lambda : self.user.user_chats)()
        chat = await chat_users.aget(chat_id=message['chat_id'])
        history = await sync_to_async(lambda : chat.history)()
        messages = await history.ain_bulk(messages_hash, field_name='message_hash')
        objs_to_update = []
        for (key, message_obj) in messages.items():
            message_obj.is_read = True
            objs_to_update.append(message_obj)
        await ChatLine.objects.abulk_update(objs_to_update, ['is_read'])
        # for message_obj in message['messages']:
        #     message_file: File = None
        #     try:
        #         message_file = File(file_name=message_obj["file"]["name"], file_hash=message_obj["file"]["hash"],
        #                             file_size=message_obj["file"]["size"], file_type=message_obj["file"]["type"])
        #     except (KeyError, TypeError) as e:
        #         message_file = None
        #     message = MessageDto(message_hash=message_obj["message_hash"], line_text=message_obj.get("line_text", ""),
        #                          chat_id=message_obj["chat_id"], is_read=False, timestamp=message_obj["timestamp"],
        #                          file=message_file, peer_email=message_obj['peer_email'])
        await self.channel_layer.group_send(
            room_group_name,
            {
                "type": "chat_message",
                "message": message,
            }
        )


    async def init_message(self):
        user = self.scope["user"]
        user_chats = await sync_to_async(lambda : user.user_chats)()
        chats_dto = []
        async for chat in user_chats.all():

            room_group_name = "chat_%d" % chat.chat_id
            await self.channel_layer.group_add(room_group_name, self.channel_name)

            messages = []
            peers = []
            history = await sync_to_async(lambda : chat.history)()
            # make with prefetch
            async for message in history.all():
                file: File = None
                file_obj = await sync_to_async(lambda : message.file)()
                message_peer = await sync_to_async(lambda: message.user)()
                if file_obj:
                    file = File(file_hash=file_obj.file_hash, file_name=file_obj.name, file_size=file_obj.size,
                                file_type=file_obj.file_type, preview=file_obj.preview)
                    file.preview = base64.b64encode(file.preview).decode()
                messages.append(MessageDto(message_hash=message.message_hash, line_text=message.line_text,
                                           is_read=message.is_read, chat_id=chat.chat_id, file=file,
                                           timestamp=message.created_at.timestamp(), peer_email=message_peer.email))
            _peers = await sync_to_async(lambda : chat.chat_users)()
            async for peer in _peers.all():
                peers.append(PeerDto(email=peer.email, avatar=peer.avatar, nickname=peer.nickname))
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
                                    file=file, created_at=datetime.fromtimestamp(message.timestamp,tz=pytz.UTC), is_read=message.message.is_read, message_hash=message.message.message_hash)

    async def send_message(self, event):
        message_file: File = None
        try:
            message_file = File(file_name=event["file"]["name"], file_hash=event["file"]["hash"],
                                file_size=event["file"]["size"], file_type=event["file"]["type"])
        except (KeyError, TypeError) as e:
            message_file = None
        message = ChatMessage(peerId=self.user.id, peerName=self.user.email, timestamp=event["timestamp"], type=event["type"],
                              message=MessageDto(message_hash=event["message_hash"], line_text=event.get("line_text", ""),
                            chat_id=event["chat_id"], is_read=event.get("is_read", False), timestamp=event["timestamp"], file=message_file, peer_email=self.user.email))

        await self.save_message(message)
        room_group_name = "chat_%d" % message.message.chat_id
        message_dict = message.__dict__
        message_dict['message'] = message.message.__dict__
        if message_file:
            message_dict['message']['file'] = message_file.__dict__
        # data = json.dumps(message, default=lambda o: o.__dict__)
        await self.channel_layer.group_send(
            room_group_name,
            {
                "type": "chat_message",
                "message": message_dict,
            }
        )

    async def chat_message(self, event):
        # room_group_name = "chat_%d" % int(event["message"]["chat_id"])
        # room = self.rooms.get(room_group_name, [])
        message = json.dumps(event["message"])
        # room.append(message)
        await self.send_json(
            event["message"],
        )
