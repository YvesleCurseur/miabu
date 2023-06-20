from django.db import models

# Create your models here.

from django.conf import settings
from django.utils import timezone

from cloudinary_storage.storage import RawMediaCloudinaryStorage



OPTIONS = (
        ('draft', 'Draft'),
        ('publish', 'Publish'),
    )
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
class Evaluation(models.Model):
    # Fields from Topic model
    title = models.CharField(max_length=150)
    content = models.TextField()
    slug = models.SlugField(max_length=1000, unique_for_date='publish_at')
    publish_at = models.DateTimeField(default=timezone.now)
    create_at = models.DateTimeField(default=timezone.now)
    last_update_at = models.DateTimeField(default=timezone.now)
    delete_at = models.DateTimeField(null=True, blank=True)
    category = models.ForeignKey('forum.Category', on_delete=models.SET_NULL, null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assessment_evaluations')
    status = models.CharField(max_length=10, choices=OPTIONS, default='publish')
    media = models.FileField(upload_to='raw/', blank=True, storage=RawMediaCloudinaryStorage())
    image = models.ImageField(upload_to='images/', blank=True)

    # Fields for assessment
    visits = models.PositiveIntegerField(default=0)
    level = models.ForeignKey(Level, on_delete=models.CASCADE, related_name='assessment_evaluations', null=True)
    domain = models.ForeignKey(Domain, on_delete=models.CASCADE, related_name='assessment_evaluations', null=True)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, related_name='assessment_evaluations', null=True)
    establishment = models.ForeignKey(Establishment, on_delete=models.SET_NULL, related_name='assessment_evaluations', null=True)
    year = models.CharField(max_length=100)
    # answer = models.ManyToManyField(Answer, blank=True)
    def __str__(self):
        return self.title
