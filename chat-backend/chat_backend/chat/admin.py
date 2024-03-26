from django.contrib import admin
from .models import Chat, ChatLine
from accounts.admin import ChatsInline

admin.site.register(ChatLine)


@admin.register(Chat)
class ChatUsers(admin.ModelAdmin):
    model = Chat
    inlines = [
        ChatsInline,
    ]

# Register your models here.
