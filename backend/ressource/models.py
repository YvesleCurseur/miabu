import os
from django.db import models

def get_media_path(instance, filename):
    """
    Fonction de destination pour les fichiers multimédias.
    Cette fonction retourne le chemin d'enregistrement personnalisé en fonction du modèle parent.
    """
    if instance.topic:
        return os.path.join('media', 'topic', str(instance.topic.id), filename)
    elif instance.answer:
        return os.path.join('media', 'answer', str(instance.answer.id), filename)
    elif instance.evaluation:
        return os.path.join('media', 'evaluation', str(instance.evaluation.id), filename)
    elif instance.comment:
        return os.path.join('media', 'comment', str(instance.comment.id), filename)
    else:
        return os.path.join('media', 'unknown', filename)

class Media(models.Model):
    """
        Media model
    """
    title = models.CharField(max_length=250)
    file = models.FileField(upload_to=get_media_path)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
