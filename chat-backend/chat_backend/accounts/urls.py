from django.urls import path, re_path
from django.contrib.auth import views as auth_views

from . import views
from .auth import ExpireAuthToken

app_name = "accounts"

urlpatterns = [
    path('login/', ExpireAuthToken.as_view(), name="login"),
    # path('logout/', auth_views.LogoutView.as_view(next_page='accounts:login'), name='logout'),
    path('signup/', views.signup, name="signup"),
    path('logout/', views.logout, name="logout"),

    path('profile/', views.profile, name="profile"),
    # re_path(r'confirm/(?P<random_url>\^[\w]{32}$)', views.confirm_account, name="confirm")
]