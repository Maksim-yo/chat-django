from django.urls import path
from django.contrib.auth import views as auth_views

from . import views
from .auth import ExpireAuthToken

app_name = "accounts"

urlpatterns = [
    path('login/', ExpireAuthToken.as_view(), name="login"),
    path('logout/', auth_views.LogoutView.as_view(next_page='accounts:login'), name='logout'),
    path('signup/', views.signup, name="signup"),
    path('logout/', views.logout, name="logout"),

]