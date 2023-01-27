from email import message
from msilib.schema import Class
from pickle import TRUE
from rest_framework import viewsets, generics
from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, DjangoModelPermissions, BasePermission, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly
from drf_yasg.utils import swagger_auto_schema
from django.contrib.auth.models import User, Group
from forum.serializers import UserSerializer, GroupSerializer, QuestionSerializer, AnswerSerializer
from forum.models import Question, Answer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import filters

class QuestionUserWritePermission(BasePermission):
    message = 'Editing post is restricted to the author only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user

# Posez une question
class CreateQuestionView(generics.CreateAPIView):
    """
        Add a question
        Want: 'title', 'content', 'author', 'status'
    """
    serializer_class = QuestionSerializer
    pass

# Détail d'une question
class ReadQuestionView(generics.RetrieveAPIView):
    """
        Get a specific question
        Return: 'id', 'title', 'content', 'slug', 'create_at', 'author', 'status'
    """
    # permission_classes = [DjangoModelPermissions]
    # permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Question.question_objects.all()
    serializer_class = QuestionSerializer

    # def get_queryset(self):
    #     id = self.request.query_params.get('pk', None)
    #     print(id)
    #     return Question.objects.filter(id=id)

class QuestionListDetailFilter(generics.ListAPIView):

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['$slug']

    # '^' Starts-with search.
    # '=' Exact matches.
    # '@' Full-text search. (Currently only supported Django's PostgreSQL backend.)
    # '$' Regex search.



# Modifier une question
class UpdateQuestionView(generics.UpdateAPIView, QuestionUserWritePermission):
    """
        Update a specific question
        Return: 'id', 'title', 'content', 'create_at', 'author', 'status'
    """
    permission_classes = [QuestionUserWritePermission]
    queryset = Question.question_objects.all()
    serializer_class = QuestionSerializer


# Détail d'une question
class DeleteQuestionView(generics.DestroyAPIView, QuestionUserWritePermission):
    """
        Get a specific question
        Return: 'id', 'title', 'content', 'create_at', 'author', 'status'
    """
    permission_classes = [QuestionUserWritePermission]
    queryset = Question.question_objects.all()
    serializer_class = QuestionSerializer


# Afficher la liste des questions
class ListQuestionView(generics.ListAPIView):
    """
        Get list of questions
        Return: 'id', 'title', 'content', 'create_at', 'author', 'status'
    """
    
    # Le question_object va retourner toutes les questions publiées
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = QuestionSerializer

    # Récupérer les question en se basant sur le user
    def get_queryset(self):
        user = None
        if user is not None:
            user = self.request.user.id
            return Question.objects.filter(author=user)
        else:
            return Question.objects.all()

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



































class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    # queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]