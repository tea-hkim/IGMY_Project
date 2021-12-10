from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/', include('allauth.urls')),  # 소셜로그인
    # 여기부터 비밀번호 변경 이메일 보내는 api
    url(r'^auth/', include('djoser.urls')),
    # url(r'auth/', include('djoser.urls.jwt')),
    # path('auth/', include('djoser.social.urls')),
    # re_path('.*', TemplateView.as_view(template_name='index.html')),
]

#urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
