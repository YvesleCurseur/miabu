from django.shortcuts import render
from rest_framework import viewsets, generics, status
from assessment.models import Evaluation
from assessment.serializers import EvaluationSerializer

class CreateEvaluationView(generics.CreateAPIView):
    """
        Get a specific Topic
        Return: 'id', 'title', 'content', 'slug', 'create_at', 'author', 'status'
    """
    serializer_class = EvaluationSerializer
