from rest_framework import serializers
from django.contrib.auth.models import User, Group
from forum.models import Answer, Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'title', 'content', 'slug', 'author', 'status']


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'content', 'author', 'question']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'title', 'content', 'create_at', 'author', 'status']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

# class CreateQuestionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Question
#         fields = ['title', 'content']