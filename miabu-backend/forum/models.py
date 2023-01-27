from django.db import models
from django.utils import timezone
from django.conf import settings
from django.utils.text import slugify

class Category(models.Model):
    """
        Category model
    """

    # Nom de la categorie
    name = models.CharField(max_length=100)

    # Une description de la categorie qui peut être vide dû le "blank=true"
    description = models.CharField(max_length=100, blank=True)

    # Retourne le nom par défaut (admin)
    def __str__(self):
        return self.name

class Question(models.Model):
    """
        User create a question
    """

    # Un custom manager(Model) qui permet de ne récupérer que les Questions publiés
    class QuestionObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset() .filter(status='publish')

    # Brouillon et Publié pour la Question
    OPTIONS = (
        ('draft', 'Draft'),
        ('publish', 'Publish'),
    )

    # Titre de la question (a une limite)
    title = models.CharField(max_length=150)

    # Contenu de la question, qui devrait recevoir tout type de documentà à voir si je suis obligé d'utiliser FrolaEditorField
    content = models.TextField()

    # Slug dans l'url qui doit être au format https://domain.com/questions/30394225/slug
    slug = models.SlugField(max_length=1000, unique_for_date='publish')

    # Contenir les images
    images = models.ImageField(blank=True)

    # Quand la question est publié
    publish = models.DateTimeField(default=timezone.now)

    # Création récupérée pour affichage
    create_at = models.DateTimeField(default=timezone.now)

    # Dernière modification de la part de l'utilisateur
    last_update_at = models.DateTimeField(default=timezone.now)

    # Suppression
    delete_at = models.DateTimeField(default=timezone.now)

    # Catégorie relation pls à pls et peut être null
    category = models.ManyToManyField(Category, blank=True)

    # Auteur de la réponse je le met à SET_DEFAULT on delete pour toujours avoir l'auteur de la question
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='forum_questions')

    # Pour voir si la question est en brouillon ou non
    status = models.CharField(max_length=10, choices=OPTIONS, default='publish')

    # default manager
    objects = models.Manager()  

    # custom manager
    question_objects = QuestionObjects()  

    # # Champs à réutiliser plus tard

    # # Ce message a été indexé par le moteur de recherche
    # indexed = models.BooleanField(default=False)

    # # Indique la valeur d'information de la publication
    # rank = models.FloatField(default=0, blank=True)

    # Retourne le titre par défaut (admin)
    def __str__(self):
        return self.title

    @property
    def number_of_likes(self):
        """
            Return the number of likes for a question
        """
        return self.likes.count()
    
    # Réogranisé par le dernier publié
    class Meta:
        ordering = ['-publish']

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Question, self).save(*args, **kwargs)

class Answer(models.Model):
    """
        User create an answer
    """

    # Contenu de la question, qui devrait recevoir tout type de documentà à voir si je suis obligé d'utiliser FrolaEditorField
    content = models.TextField()

    # Contenir les images
    images = models.ImageField()

    # Création récupérée pour affichage
    create_at = models.DateTimeField(default=timezone.now)

    # Dernière modification de la part de l'utilisateur
    last_update_at = models.DateTimeField(default=timezone.now)

    # Suppression
    delete_at = models.DateTimeField(default=timezone.now)

    # Auteur de la réponse je le met à SET_DEFAULT on delete pour toujours avoir l'auteur de la question
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='forum_answers')

    # Pour s'assurer que quelqu'un qui répond ne puisse voté
    is_replied = models.BooleanField(default=True)

    # Quand on supprime une question les réponses partent
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE
    )

    # propriété qui retournes le nombres de votes
    @property
    def number_of_votes(self):
        """
            Return the number of vote for a answer
        """
        return self.votes.count()

class Comment(models.Model):
    """
        User create an comment
    """

    # Contenu de la question, qui devrait recevoir tout type de documentà à voir si je suis obligé d'utiliser FrolaEditorField
    content = models.TextField()

    # Contenir les images
    images = models.ImageField()

    # Création récupérée pour affichage
    create_at = models.DateTimeField(default=timezone.now)

    # Dernière modification de la part de l'utilisateur
    last_update_at = models.DateTimeField(default=timezone.now)

    # Suppression
    delete_at = models.DateTimeField(default=timezone.now)

    # Auteur de la réponse je le met à SET_DEFAULT on deleete pour toujours avoir l'auteur de la question
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='forum_comments')

    # Pour s'assurer que quelqu'un qui répond ne puisse voté
    is_replied = models.BooleanField(default=True)

    # Quand on supprime une réponse les commentaires partent
    anwser = models.ForeignKey(
        Answer,
        on_delete=models.CASCADE
    )

class Visit(models.Model):
    """ 
    User visits
    """

    # Auteur de la visite
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    # Addresse ip de l'utilisateur
    ip_address = models.CharField(max_length=250)

    # Date de visite de l'utilisateur
    visit_at = models.DateTimeField(default=timezone.now)

    # Réogranisé par le dernier visité
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
        return self.question.title

class Share(models.Model):
    """ 
        User want to share a question
    """
    
    # Auteur du vote
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    # Quand on supprime une question les partagent ne fonctionnent plus
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE
    )

    # Date du partage
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question.title
