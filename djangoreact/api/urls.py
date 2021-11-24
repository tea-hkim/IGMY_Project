from django.urls import path
from . import views

app_name = "api"

urlpatterns = [
    path('create/', views.createUser),
    path('login/', views.login),
    path('search-all/', views.search_all),
    path('search-direct/', views.search_direct),
    # OAuth : kakao api
    path("login/kakao", views.kakao_login, name="kakao_login"),
    path("login/kakao/callback", views.kakao_callback, name="kakao_callback"),
    # path('login/kakao/finish/', views.kakao_login_finish.as_view(),
    #      name='kakao_login_todjango'),
    path("/pill-detail/<string:pill-id>", views.pill_detail),
]
