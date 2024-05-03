from dataclasses import dataclass


@dataclass
class FileDTO:
    file_hash: str
    name: str
    size: int
    data: bytes
