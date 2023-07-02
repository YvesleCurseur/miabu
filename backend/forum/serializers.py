from rest_framework import serializers
from forum.models import Answer, Topic
from user.serializers import UserDetailSerializer

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'title', 'content', 'create_at', 'author', 'status']

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'title', 'content', 'slug', 'author', 'status', 'create_at']

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'content', 'author', 'evaluations']

class AnswerDetailSerializer(serializers.ModelSerializer):
    author = UserDetailSerializer()
    class Meta:
        model = Answer
        fields = ['id', 'content', 'author', 'evaluations', 'create_at']    
