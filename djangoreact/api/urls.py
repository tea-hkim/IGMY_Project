from django.urls import path
from . import views

urlpatterns = [
    path('create', views.createUser),
    path('login', views.login),
    # kakao
    path("login/kakao", views.kakao_login, name="kakao-login"),
    path("login/kakao/callback", views.kakao_callback, name="kakao-callback"),
]
