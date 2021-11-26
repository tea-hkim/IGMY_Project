from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    # path(‘api/’, include(‘api.urls’)),
    #re_path('.*', TemplateView.as_view(template_name='index.html')),
    path('api/', include('api.urls')),
    
    # 여기부터 비밀번호 변경 이메일 보내는 api
    path('password_reset/', auth_views.PasswordResetView.as_view(), name="password_reset"),
    path('password_reset_done/', auth_views.PasswordResetDoneView.as_view(), name="password_reset_done"),
    path('password_reset_confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    path('password_reset_complete/', auth_views.PasswordResetCompleteView.as_view(), name="password_reset_complete"),
]
