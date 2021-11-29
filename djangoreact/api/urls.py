from django.urls import path
from django.conf.urls import url
from django.urls.conf import include
from . import views

app_name = "api"

urlpatterns = [
    path('create/', views.createUser),
    path('search-all/', views.search_all),
    path('search-direct/', views.search_direct),
    path('user-pill/', views.user_pill),
    path('user-pill-list/', views.user_pill_list),
    path('send_email/', views.send_email),  # 구글 이메일 보내기 테스트용
    path("pill-detail/", views.pill_detail),
    #path('result-photo/', views.result_photo),

    # OAuth : kakao api
    #path("login/kakao", views.kakao_login, name="kakao_login"),
    #path("login/kakao/callback", views.kakao_callback, name="kakao_callback"),
    # path('login/kakao/finish/', views.kakao_login_finish.as_view(),
    #      name='kakao_login_todjango'),
    #path("/pill-detail/<string:pill-id>", views.pill_detail),
    path('result-photo/', views.result_photo),
    path('search-history/', views.search_history),
    # 로그인 api
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # 토큰 refresh api
    path('token/refresh/', views.MyTokenRefreshView.as_view(), name='token_refresh'),
]
