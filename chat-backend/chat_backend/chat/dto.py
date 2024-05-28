from dataclasses import dataclass
from typing import List
import enum


class MessageTypes(enum.IntEnum):

    CODE_PEER_MESSAGE = 1
    CODE_CHAT_INFO = 2
    CODE_MESSAGE_ACK = 3
    CODE_ROOM_CREATED = 4
    CODE_PEER_READ = 5

@dataclass
class MessageInfo:
    peerName: str
    peerId: int
    timestamp: int
    type: int



@dataclass
class PeerDto:
    email: str
    avatar: str
    nickname: str

@dataclass
class File:
    file_hash: str
    file_name: str
    file_size: int
    file_type: str
    preview: str = None

@dataclass
class MessageDto:
    message_hash: str
    line_text: str
    chat_id: int
    timestamp: int
    peer_email: str
    file: File = None
    is_read: bool = False


@dataclass
class ChatMessage(MessageInfo):
    message: MessageDto

@dataclass
class ChatDto:
    chat_id: int
    history: List[ChatMessage]
    peers: List[PeerDto]


@dataclass
class InitialMessage(MessageInfo):
    chats: List[ChatDto]

