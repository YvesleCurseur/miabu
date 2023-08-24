from django.contrib import admin
from .models import Establishment, Course, Domain, Level, Evaluation, Like, Image

class EvaluationAdmin(admin.ModelAdmin):
    fieldsets = [
            ('Informations Basiques', {'fields': ['title', 'content', 'author', 'status', 'media', 'images']}),
            ('Détails Epreuve', {'fields': ['level', 'domain', 'course', 'establishment', 'year']}),
        ]

admin.site.register(Establishment)
admin.site.register(Course)
admin.site.register(Domain)
admin.site.register(Level)
admin.site.register(Evaluation, EvaluationAdmin)
admin.site.register(Image)