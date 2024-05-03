"""
ASGI config for chat_backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chat_backend.settings")
django.setup()

from django.core.asgi import get_asgi_application

from chat.routing import websocket_urlpatterns
from chat.auth_middleware import TokenAuthMiddleware

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from channels.routing import ProtocolTypeRouter





application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket":  AllowedHostsOriginValidator(TokenAuthMiddleware(URLRouter(websocket_urlpatterns))
        ),
    }
)