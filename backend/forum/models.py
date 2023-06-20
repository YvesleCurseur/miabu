# You are now back to your project
# Make sure you have all you need to start the project
from django.db import models
from django.utils import timezone
from django.conf import settings
from django.utils.text import slugify
from ressource.models import Media
from cloudinary_storage.storage import RawMediaCloudinaryStorage

from assessment.models import Course, Domain, Level, Establishment, Evaluation

OPTIONS = (
        ('draft', 'Draft'),
        ('publish', 'Publish'),
    )

# Files (Evaluation, Topic, Category, Etablishment)
class Category(models.Model):
    """
        Category of the question
    """
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100, blank=True)
    create_at = models.DateTimeField(default=timezone.now)
    update_at = models.DateTimeField(auto_now=True)

    # Return the name of the category by default
    def __str__(self):
        return self.name

class Topic(models.Model):
    """
        Topic model
    """
    # A custom manager(Model) to retrieve only published questions
    class TopicObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='publish')

    title = models.CharField(max_length=150)
    # Content of the topic, which should receive text
    content = models.TextField()
    # Slug in the url which must be in the format https://domain.com/topics/30394225/slug
    slug = models.SlugField(max_length=1000, unique_for_date='publish_at')
    publish_at = models.DateTimeField(default=timezone.now)
    # Create date of the topic
    create_at = models.DateTimeField(default=timezone.now)
    # Last update date of the topic
    last_update_at = models.DateTimeField(default=timezone.now)
    # Date of deletion of the topic
    delete_at = models.DateTimeField(null=True, blank=True)
    # Specifically, each record in the current model can be linked to a record in the Category model, 
    # but each record in the Category model can be linked to multiple records in the current model. 
    # That's why it's called a "one-to-many" relationship.
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    # Author of the answer I set it to SET_DEFAULT on delete to always have the author of the topic
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='forum_topics')
    # To know if the topic is published or not
    status = models.CharField(max_length=10, choices=OPTIONS, default='publish')
    media = models.FileField(upload_to='raw/', blank=True, storage=RawMediaCloudinaryStorage())
    image = models.ImageField(upload_to='images/', blank=True)
    # Default manager
    objects = models.Manager()  
    # Custom manager
    topic_objects = TopicObjects()  

    def __str__(self):
        return self.title

    @property
    def number_of_likes(self):
        """
            Return the number of likes for a question
        """
        return self.likes.count()
    
    # Order by the last publish
    class Meta:
        ordering = ['-publish_at']

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Topic, self).save(*args, **kwargs)

    def delete(self):
        self.delete_at = timezone.now()
        self.save()


class Answer(models.Model):
    content = models.TextField()
    media = models.ManyToManyField(Media, blank=True)
    create_at = models.DateTimeField(default=timezone.now)
    last_update_at = models.DateTimeField(default=timezone.now)
    delete_at = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='forum_answers')
    is_replied = models.BooleanField(default=True)
    evaluations = models.ForeignKey(Evaluation, on_delete=models.CASCADE, related_name='assessment_answers', null=True, blank=True)
    topics = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='forum_answers', null=True, blank=True)

    @property
    def number_of_votes(self):
        return self.votes.count()
    
    def delete(self):
        self.delete_at = timezone.now()
        self.save()


class Comment(models.Model):
    """
        User create an comment
    """
    content = models.TextField()
    media = models.ManyToManyField(Media, blank=True)
    create_at = models.DateTimeField(default=timezone.now)
    last_update_at = models.DateTimeField(default=timezone.now)
    delete_at = models.DateTimeField(default=timezone.now)
    # Author of the comment put SET_DEFAULT on delete to always have the author of the question
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='forum_comments')
    is_replied = models.BooleanField(default=True)
    anwser = models.ForeignKey(
        Answer,
        on_delete=models.CASCADE
    )

class Visit(models.Model):
    """ 
        User visits
    """
    # author of the visit
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    # Ip address of the user
    ip_address = models.CharField(max_length=250)
    visit_at = models.DateTimeField(default=timezone.now)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    class Meta:
        ordering = ['-visit_at']

class Vote(models.Model):
    """
        User vote an answer
    """

    # Auteur de la réponse je le met à True pour vérifier si il y'a eu un auteur ou pas à la question
    author = models.BooleanField(default=True)

    # Date de vote
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.answer.content

class Save(models.Model):
    """
        User save a question
    """

    # Auteur du vote
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    # Date de vote
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.topic.title

class Share(models.Model):
    """ 
        User want to share a question
    """
    
    # Auteur du vote
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    # Quand on supprime une question les partagent ne fonctionnent plus
    topic = models.ForeignKey(
        Topic,
        on_delete=models.CASCADE
    )

    # Date du partage
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.topic.title
    

