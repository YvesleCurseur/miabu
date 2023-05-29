from rest_framework import viewsets, generics
from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, DjangoModelPermissions, BasePermission, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly
from drf_yasg.utils import swagger_auto_schema
from django.contrib.auth.models import User, Group
from forum.serializers import TopicSerializer, AnswerSerializer
from forum.models import Topic, Answer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import filters
from rest_framework.decorators import api_view

class TopicUserWritePermission(BasePermission):
    message = 'Editing post is restricted to the author only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user

# Posez une topic
class CreateTopicView(generics.CreateAPIView):
    """
        Add a Topic
        Want: 'title', 'content', 'author', 'status'
    """
    serializer_class = TopicSerializer
    pass

# Détail d'une Topic
class ReadTopicView(generics.RetrieveAPIView):
    """
        Get a specific Topic
        Return: 'id', 'title', 'content', 'slug', 'create_at', 'author', 'status'
    """
    # permission_classes = [DjangoModelPermissions]
    # permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Topic.topic_objects.all()
    serializer_class = TopicSerializer

    # def get_queryset(self):
    #     id = self.request.query_params.get('pk', None)
    #     print(id)
    #     return Topic.objects.filter(id=id)

class TopicListDetailFilter(generics.ListAPIView):

    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['$slug']

    # '^' Starts-with search.
    # '=' Exact matches.
    # '@' Full-text search. (Currently only supported Django's PostgreSQL backend.)
    # '$' Regex search.



# Modifier une Topic
class UpdateTopicView(generics.UpdateAPIView, TopicUserWritePermission):
    """
        Update a specific Topic
        Return: ' ', 'title', 'content', 'create_at', 'author', 'status'
    """
    permission_classes = [TopicUserWritePermission]
    queryset = Topic.topic_objects.all()
    serializer_class = TopicSerializer


# Détail d'une Topic
class DeleteTopicView(generics.DestroyAPIView, TopicUserWritePermission):
    """
        Get a specific Topic
        Return: 'id', 'title', 'content', 'create_at', 'author', 'status'
    """
    permission_classes = [TopicUserWritePermission]
    queryset = Topic.topic_objects.all()
    serializer_class = TopicSerializer


# Afficher la liste des Topics
class ListTopicView(generics.ListAPIView):
    """
        Get list of Topics
        Return: 'id', 'title', 'content', 'create_at', 'author', 'status'
    """
    
    # Le Topic_object va retourner toutes les Topics publiées
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = TopicSerializer

    # Récupérer les Topic en se basant sur le user
    def get_queryset(self):
        user = None
        if user is not None:
            user = self.request.user.id
            return Topic.objects.filter(author=user)
        else:
            return Topic.objects.all()

# Donner une Reponse
class CreateAnswerView(generics.CreateAPIView):
    """
        Add a Answer
        Want: 'title', 'content', 'author', 'status'
    """
    serializer_class = AnswerSerializer
    pass

# Détail d'une Answer
class ReadAnswerView(generics.DestroyAPIView):
    """
        Get a specific Answer
        Return: 'id', 'title', 'content', 'create_at', 'author', 'status'
    """
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer 
    pass

# Modifier une Answer
class UpdateAnswerView(generics.UpdateAPIView):
    """
        Update a specific Answer
        Return: 'id', 'title', 'content', 'create_at', 'author', 'status'
    """
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    pass

# Détail d'une Answer
class DeleteAnswerView(generics.DestroyAPIView):
    """
        Get a specific Answer
        Return: 'id', 'title', 'content', 'create_at', 'author', 'status'
    """
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    pass


# Afficher la liste des Answers
class ListAnswerView(generics.ListAPIView):
    """
        Get list of Answers
        Return: 'id', 'title', 'content', 'create_at', 'author', 'status'
    """
    # Le Answer_object va retourner toutes les Answers publiées
    queryset = Answer.objects.all()

    serializer_class = AnswerSerializer
    pass

@api_view()
def hello_world(request):
    return Response({"message": "Hello, World!"})
    