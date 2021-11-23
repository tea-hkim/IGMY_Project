from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.createUser),
    path('login/', views.login),
    path('pill/', views.get_info_pill),
    path('search-direct/', views.search_direct),
]