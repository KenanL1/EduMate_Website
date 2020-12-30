from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(User)
admin.site.register(Forum)
admin.site.register(Discussion)
admin.site.register(Quiz_Questions)
admin.site.register(Quiz_MCAnswers)
admin.site.register(LearningMaterial)


