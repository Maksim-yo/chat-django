from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = "chat"

urlpatterns = [
    # path('test/', test, name="test"),
    path('upload/', views.file_upload, name="upload"),
    path('download/<str:file_hash>', views.file_download, name="download")
]