from dataclasses import dataclass


@dataclass
class StorageDTO:
    path: str               # should include real name
    bucket_name: str
    hash: str
    size: int
    name: str


