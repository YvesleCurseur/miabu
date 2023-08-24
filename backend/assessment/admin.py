from django.contrib import admin
from .models import Establishment, Course, Domain, Level, Evaluation, Like, Image, Session

class EvaluationAdmin(admin.ModelAdmin):
    fieldsets = [
            ('Informations Basiques', {'fields': ['title', 'content', 'author', 'status', 'media', 'images']}),
            ('Détails Epreuve', {'fields': ['level', 'domain', 'course', 'session',  'year']}),
        ]

class CourseAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['name', 'level', 'domain']}),
    ]

admin.site.register(Course, CourseAdmin)
admin.site.register(Domain)
admin.site.register(Level)
admin.site.register(Evaluation, EvaluationAdmin)
admin.site.register(Image)
admin.site.register(Session)