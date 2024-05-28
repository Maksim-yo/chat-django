from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from django.apps import apps

from chat.FileType import FileType
from chat.models import File as FileModel
from accounts.models import ChatUser
from accounts.serializers import UserSerializer
from storage.service import file_download as storage_download, file_upload as storage_upload
from django.db.models import Q


def upload_preview(file_name: str, file_type:str, file_size:int, file_hash:str, file_data:bytes):
    test = FileModel.objects.create(name=file_name, size=file_size, file_hash=file_hash, file_type=file_type, preview=file_data)
    a = 4


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
def file_upload(request):
    try:
        file_name = request.data['name']

        chat_id = request.data['chat_id']
        file_type = request.data['file_type']
        file_size = request.data['file_size']
        file = request.data['data']

        type = FileType.file_type(file_name)
        type_path = apps.get_app_config('chat').type_folders[type]
        file_path = f"{chat_id}/{type_path}"
        file_data = file.read()
        file_hash = storage_upload(file_path, file_data, file_name)
        upload_preview(file_name, file_type, file_size, file_hash["file_hash"], file_data)
        return Response(file_hash, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def file_download(request, file_hash: str):
    try:
        file = storage_download(file_hash)
        return Response(file, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET'])  
@permission_classes([IsAuthenticated])
def find_peers_by_mail(request, mail: str):

    # request.user.
    chats = [chat for chat in request.user.user_chats.all()]
    id_to_exclude = []
    for chat in chats:
        for user in chat.chat_users.all():
            id_to_exclude.append(user.id)

    users = ChatUser.objects.filter(email__startswith=mail).exclude(id__in=id_to_exclude)[:5]
    users_data = UserSerializer(data=users, many=True)
    users_data.is_valid()

    return Response(users_data.data, status=status.HTTP_200_OK)