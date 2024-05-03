from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser
from storage import config
from django.http import FileResponse
import json
import base64
from django.core.files.uploadedfile import InMemoryUploadedFile, TemporaryUploadedFile
from django.core.files.uploadhandler import FileUploadHandler, MemoryFileUploadHandler, TemporaryFileUploadHandler


def file_download(file_hash: str):
    try:
        file = config.file_service.download_file(file_hash)
        file.data = base64.b64encode(file.data).decode()
        return json.dumps(file, default=lambda o: o.__dict__)
    except Exception as e:
        return {'error': str(e)}



def file_upload(path: str, data: bytes, file_name: str):
    try:
        file_hash: str
        file_hash = config.file_service.upload_file(path, file_name, data)
        return {"file_hash": file_hash}
    except Exception as e:
            return {'error': str(e)}


@api_view(['GET'])
def test(request):
    file = open('C:/Users/lyzlo/Downloads/YoutubePlaylistDownloader.exe', 'rb')
    return FileResponse(file, filename='YoutubePlaylistDownloader.exe', as_attachment=True)


config.init_config()