from rest_framework import serializers
from django.contrib.auth.models import User, Group
from forum.models import Answer, Topic, Comment
from assessment.serializers import *

class TopicSerializer(serializers.ModelSerializer):
    establishment = EstablishmentSerializer()
    class Meta:
        model = Topic
        fields = ['id', 'title', 'content', 'slug', 'author', 'status', 'create_at', 'establishment']


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'content', 'author', 'topic']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'title', 'content', 'create_at', 'author', 'status']
