import time
from datetime import datetime, timedelta

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import logout as auth_logout
from rest_framework.request import Request


from .serializers import SignupSerializer, UserSerializer
from .token_auth import create_token
from .utils import generate_confirm_url
import storage.config as storage_config
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token_key = create_token(user)
        return Response({"token": token_key}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        request.user.auth_token.delete()
        auth_logout(request)
        return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# Add serializer
@api_view(['POST', 'GET'])
@parser_classes([MultiPartParser])
@permission_classes([IsAuthenticated])
def profile(request):

    if request.method == "GET":
        return Response({'email': request.user.email,'nickname': request.user.nickname, 'avatar': request.user.avatar}, status=status.HTTP_200_OK)
    else:
        nickname = request.data.get('nickname', None)
        avatar = request.data.get('avatar', None)

        if avatar:
            file_hash = storage_config.file_service.upload_file(f"{request.user.id}/", f"user_avatar_{request.user.id}", avatar.read())
            request.user.avatar = file_hash
        if nickname:
            request.user.nickname = nickname
        request.user.save()
        return Response({'message': 'Successfully updated.'}, status=status.HTTP_200_OK)

