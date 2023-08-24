from django.db import models
from django.conf import settings
from django.utils import timezone

from cloudinary_storage.storage import RawMediaCloudinaryStorage
# from cloudinary.models import CloudinaryField
from assessment.utils import get_activity_image_path

OPTIONS = (
        ('draft', 'Brouillon'),
        ('publish', 'Publier'),
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
    
    class Meta:
        indexes = [
            models.Index(fields=['name']),
        ]
        verbose_name = 'Etablissement'

# Models for course
class Course(models.Model):
    name = models.CharField(max_length=100)
    establishment = models.ForeignKey(Establishment, on_delete=models.SET_NULL, null=True, blank=True)
    level = models.ForeignKey('Level', on_delete=models.SET_NULL, null=True, blank=True)
    domain = models.ForeignKey('Domain', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name
    
    class Meta:
        indexes = [
            models.Index(fields=['name']),
        ]
        verbose_name = 'Cour'

# Models for domain
class Domain(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
    class Meta:
        indexes = [
            models.Index(fields=['name']),
        ]
        verbose_name = 'Domaine'

# Models for level
class Level(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
    class Meta:
        indexes = [
            models.Index(fields=['name']),
        ]
        verbose_name = 'Niveau'

class Image(models.Model):
    name = models.CharField(max_length=1000, verbose_name='Nom')  
    image = models.ImageField(upload_to='images/', blank=True, verbose_name='Lien Image')

    class Meta:
        verbose_name = 'Image'

    def __str__(self):
        return self.name
    
class Session(models.Model):

    session_type = models.CharField(max_length=1000, verbose_name='Session')
    def __str__(self):
        return self.session_type


class Evaluation(models.Model):
    # Fields from Topic model
    title = models.CharField(max_length=150, verbose_name='Titre')
    content = models.TextField(null=True, blank=True, verbose_name='Contenu')
    slug = models.SlugField(max_length=1000, unique_for_date='publish_at')
    publish_at = models.DateTimeField(default=timezone.now)
    create_at = models.DateTimeField(default=timezone.now)
    last_update_at = models.DateTimeField(default=timezone.now)
    delete_at = models.DateTimeField(null=True, blank=True)
    category = models.ForeignKey('forum.Category', on_delete=models.SET_NULL, null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assessment_evaluations', verbose_name='Auteur')
    status = models.CharField(max_length=10, choices=OPTIONS, default='publish', verbose_name='Statut')
    media = models.FileField(upload_to='raw/', blank=True, storage=RawMediaCloudinaryStorage(), verbose_name='Media')
    images = models.ManyToManyField(Image, related_name='assessment_evaluations', blank=True, verbose_name='Images')

    # Fields for assessment
    visits = models.PositiveIntegerField(default=0)
    level = models.ForeignKey(Level, on_delete=models.CASCADE, related_name='assessment_evaluations', null=True, verbose_name='Niveau')
    domain = models.ForeignKey(Domain, on_delete=models.CASCADE, related_name='assessment_evaluations', null=True, verbose_name='Domaine')
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, related_name='assessment_evaluations', null=True, verbose_name='Cours')
    session = models.ForeignKey(Session, on_delete=models.SET_NULL, related_name='assessment_evaluations', null=True, verbose_name='Session')
    establishment = models.ForeignKey(Establishment, on_delete=models.SET_NULL, related_name='assessment_evaluations', null=True, verbose_name='Etablissement')
    year = models.CharField(max_length=100, null=True, blank=True, verbose_name='Année-Académique')
    # answer = models.ManyToManyField(Answer, blank=True)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-create_at']

    class Meta:
        indexes = [
            models.Index(fields=['title']),
            models.Index(fields=['slug']),
            models.Index(fields=['content']),
            models.Index(fields=['author']),
            models.Index(fields=['status']),
            models.Index(fields=['level']),
            models.Index(fields=['domain']),
            models.Index(fields=['course']),
            models.Index(fields=['establishment']),
        ]
        verbose_name = 'Epreuve'

class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    evaluation = models.ForeignKey(Evaluation, on_delete=models.CASCADE, null=True, blank=True)
    # topic = models.ForeignKey(Topic, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Like by {self.user.username}"