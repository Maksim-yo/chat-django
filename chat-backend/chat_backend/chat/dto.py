from dataclasses import dataclass
from typing import List
import enum


class MessageTypes(enum.IntEnum):

    CODE_PEER_MESSAGE = 1
    CODE_CHAT_INFO = 2

@dataclass
class MessageInfo:
    peerName: str
    peerId: int
    timestamp: int
    type: int



@dataclass
class PeerDto:
    username: str

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
    file: File = None
    is_read: bool = False

@dataclass
class ChatDto:
    chat_id: int
    history: List[MessageDto]
    peers: List[PeerDto]

@dataclass
class ChatMessage(MessageInfo):
    message: MessageDto


@dataclass
class InitialMessage(MessageInfo):
    chats: List[ChatDto]

