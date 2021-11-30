from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(User)
admin.site.register(InfoPill)
admin.site.register(UserPill)
admin.site.register(UploadFileModel)
admin.site.register(SearchHistory)
