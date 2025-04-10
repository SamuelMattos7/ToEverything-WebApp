from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import *
from users import views

urlpatterns = [
    path("register/", RegistrationUserAPIview.as_view(), name="register-user"),
    path("login/", LoginUserAPIview.as_view(), name="login-user"),
    path("logout/", LogoutUserAPIview.as_view(), name="logout-user"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("user/", UserInfoAPIview.as_view(), name="user-details"),
    path("users-list/", views.userListView, name="users-list") # development only
]