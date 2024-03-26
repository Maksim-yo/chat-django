from django.contrib import admin
from .models import ChatUser

admin.site.register(ChatUser)

class ChatsInline(admin.TabularInline):
    model = ChatUser.user_chats.through

# Register your models here.
