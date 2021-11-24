from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.createUser),
    path('login/', views.login),
    path('search-all/', views.search_all),
    path('search-direct/', views.search_direct),
]