from django.contrib import admin
from .models import UploadFileModel, User, InfoPill, UserPill
# Register your models here.
admin.site.register(User)
admin.site.register(InfoPill)
admin.site.register(UserPill)
admin.site.register(UploadFileModel)
