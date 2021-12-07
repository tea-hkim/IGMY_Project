from django.urls import path, include
from django.conf.urls import url
from django.urls.conf import include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

app_name = "api"

urlpatterns = [
    path("sign-up/", views.createUser),
    path("search-all/", views.search_all),
    path("search-direct/", views.search_direct),
    path("user-pill/", views.user_pill),
    path("user-pill-list/", views.user_pill_list),
    path("pill-detail/", views.PillDetailView.as_view()),
    path("result-photo/", views.result_photo),
    path("search-history/", views.SearchHistoryView.as_view()),
    path("send_email/", views.send_email),  # 구글 이메일 보내기 테스트용
    # 로그인 api
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    # 토큰 refresh api
    path("token/refresh/", views.MyTokenRefreshView.as_view(), name="token_refresh"),
    path('logout/', views.LogoutView.as_view()),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # OAuth : kakao api
    path("login/kakao/", views.kakao_login, name="kakao_login"),
    path("login/kakao/callback/", views.kakao_callback, name="kakao_callback"),
    # OAuth : google api
    path('login/google/', views.google_login, name='google_login'),
    path('login/google/callback/', views.google_callback,
         name='google_callback'),
    path('login/google/finish/', views.GoogleLogin.as_view(),
         name='google_login_todjango'),
]
