from django.contrib import admin
from .models import Establishment, Course, Domain, Level, Evaluation

admin.site.register(Establishment)
admin.site.register(Course)
admin.site.register(Domain)
admin.site.register(Level)
admin.site.register(Evaluation)
