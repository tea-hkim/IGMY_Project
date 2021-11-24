from django.contrib import admin
from .models import User, InfoPill, UserPill
# Register your models here.
admin.site.register(User)
admin.site.register(InfoPill)
admin.site.register(UserPill)