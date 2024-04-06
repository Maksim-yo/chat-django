import json

from channels.generic.websocket import AsyncJsonWebsocketConsumer
from datetime import datetime
from django.contrib.auth.models import User
from asgiref.sync import async_to_sync, sync_to_async

from accounts.models import ChatUser
from .dto import *


class RoomConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.rooms = {}

        if self.scope["user"].is_anonymous:
            await self.close()
            return

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


    async def receive_json(self, content, **kwargs):

        message_type = content.get("type", None)
        try:

            match message_type:
                case "peer_message":
                    await self.send_message(content)
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
                messages.append(MessageDto(message_hash=message.message_hash, line_text=message.line_text,
                                           is_read=message.is_read, chat_id=chat.chat_id))
            _peers = await sync_to_async(lambda : chat.chatuser_set)()
            async for peer in _peers.all():
                username = await sync_to_async(lambda: peer.username)()
                peers.append(PeerDto(username=username))
            chats_dto.append(ChatDto(chat_id=chat.chat_id, history=messages, peers=peers))

        message = InitialMessage(chats=chats_dto, peerName=self.scope["user"].username,
                                 timestamp=datetime.utcnow().second,
                                 type=MessageTypes.CODE_CHAT_INFO)
        return message


    async def send_message(self, event):

        message = ChatMessage(peerName=event["username"], timestamp=event["timestamp"], type=event["type"],
                              message=MessageDto(message_hash=event["message"]["message_hash"], line_text=event["message"]["line_text"],
                            chat_id=event["message"]["chat_id"], is_read=event["message"]["chat_id"]))

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
