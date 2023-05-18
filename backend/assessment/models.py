from django.db import models

# Create your models here.

from django.conf import settings
from django.utils import timezone

# Models for establishment
class Establishment(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=100, blank=True)
    create_at = models.DateTimeField(default=timezone.now)
    update_at = models.DateTimeField(auto_now=True)

    # Return the name of the establishment by default
    def __str__(self):
        return self.name


# Models for course
class Course(models.Model):
    name = models.CharField(max_length=100)
    establishment = models.ForeignKey(Establishment, on_delete=models.CASCADE)
    level = models.ForeignKey('Level', on_delete=models.SET_NULL, null=True, blank=True)
    domain = models.ForeignKey('Domain', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


# Models for domain
class Domain(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# Models for level
class Level(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    

# Models for evaluation

# import Topic models from forum.models
from forum.models import Topic
class Evaluation(Topic):
    visits = models.PositiveIntegerField(default=0)
    # Establishment if we delete a establishment the evaluations not go away
    establishment = models.ForeignKey(Establishment, on_delete=models.SET_NULL, related_name='assessement_evaluations', null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='assessement_evaluations')
    level = models.ForeignKey(Level, on_delete=models.CASCADE, related_name='assessement_evaluations')

    

    
