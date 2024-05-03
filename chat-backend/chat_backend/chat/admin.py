from django.contrib import admin
from .models import Chat, ChatLine, File
from accounts.models import ChatUser

admin.site.register(ChatLine)
admin.site.register(Chat)
admin.site.register(File)


class ChatsInline(admin.TabularInline):
    model = Chat.chat_users.through

# TODO: Fix: not hashing password
@admin.register(ChatUser)
class ChatUserAdmin(admin.ModelAdmin):
    model = ChatUser
    inlines = [
        ChatsInline,
    ]


# Register your models here.
