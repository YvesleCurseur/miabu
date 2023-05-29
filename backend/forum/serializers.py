from rest_framework import serializers
from django.contrib.auth.models import User, Group
from forum.models import Answer, Topic, Comment

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'title', 'content', 'slug', 'author', 'status']


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'content', 'author', 'topic']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'title', 'content', 'create_at', 'author', 'status']

# class CreateQuestionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Question
#         fields = ['title', 'content']