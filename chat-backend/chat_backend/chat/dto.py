from dataclasses import dataclass
from typing import List
import enum


class MessageTypes(enum.IntEnum):

    CODE_PEER_MESSAGE = 1
    CODE_CHAT_INFO = 2

@dataclass
class MessageInfo:
    peerName: str
    timestamp: int
    type: int


@dataclass
class PeerDto:
    username: str


@dataclass
class MessageDto:
    message_hash: str
    line_text: str
    chat_id: int
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

