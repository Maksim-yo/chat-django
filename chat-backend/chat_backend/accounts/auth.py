from datetime import datetime

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .serializers import ChatAuthTokenSerializer


class ExpireAuthToken(ObtainAuthToken):

    serializer_class = ChatAuthTokenSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user, defaults={'created': datetime.utcnow()})
        return Response({
            'token': token.key,
        })