from django.urls import path
from django.conf.urls import url
from django.urls.conf import include
from . import views

app_name = "api"

urlpatterns = [
    path('create/', views.createUser),
    path('login/', views.login),
    path('search-all/', views.search_all),
    path('search-direct/', views.search_direct),
    path('user-pill/', views.user_pill),
    path('send_email/', views.send_email),  # 구글 이메일 보내기 테스트용
    # 로그아웃 url api/rest-auth/logout
    url(r'^rest-auth/', include('rest_auth.urls')),
    path('logout/', views.logout),

    url(r'^rest-auth/', include('rest_auth.urls')),
    # OAuth : kakao api
    #path("login/kakao", views.kakao_login, name="kakao_login"),
    #path("login/kakao/callback", views.kakao_callback, name="kakao_callback"),
    # path('login/kakao/finish/', views.kakao_login_finish.as_view(),
    #      name='kakao_login_todjango'),
    path("pill-detail/", views.pill_detail),
    # path('result-photo/', views.result_photo),
]
