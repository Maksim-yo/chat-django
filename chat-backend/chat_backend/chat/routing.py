from django.urls import re_path

from chat import consumer

websocket_urlpatterns = [
    re_path(r"ws/", consumer.RoomConsumer.as_asgi()),
]
