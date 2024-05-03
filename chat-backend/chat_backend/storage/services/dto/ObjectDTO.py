from dataclasses import dataclass


@dataclass
class ObjectDTO:
    name: str
    hash: str
    size: int
