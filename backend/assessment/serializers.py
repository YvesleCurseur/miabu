from rest_framework import serializers
from assessment.models import Evaluation, Establishment, Course, Domain, Level, Like
from user.serializers import UserDetailSerializer
from forum.serializers import AnswerSerializer, AnswerDetailSerializer

class EstablishmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establishment
        fields = ['name', 'description', 'location']

class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = ['name']

class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = ['name']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['name']

class EvaluationSerializer(serializers.ModelSerializer):
    level = LevelSerializer(required=False, allow_null=True)
    domain = DomainSerializer(required=False, allow_null=True)
    course = CourseSerializer(required=False, allow_null=True)
    establishment = EstablishmentSerializer(required=False, allow_null=True)

    class Meta:
        model = Evaluation
        fields = ['id', 'title', 'content', 'author', 'status', 'year', 'establishment', 'level', 'course', 'domain', 'media', 'image', 'create_at', 'last_update_at']

    def create(self, validated_data):
        level_data = validated_data.pop('level', None)
        course_data = validated_data.pop('course', None)
        domain_data = validated_data.pop('domain', None)
        establishment_data = validated_data.pop('establishment', None)

        if domain_data is not None:

            domain_name = domain_data.get('name')
            domain = Domain.objects.create(name=domain_name)

            evaluation = Evaluation.objects.create(**validated_data)

            if establishment_data:
                establishment = Establishment.objects.create(**establishment_data)
                evaluation.establishment = establishment

            level = Level.objects.create(**level_data)
            course = Course.objects.create(establishment=evaluation.establishment, domain=domain, **course_data)

            evaluation.level = level
            evaluation.course = course
            evaluation.domain = domain
            evaluation.save()
        else :
            evaluation = Evaluation.objects.create(**validated_data)

        return evaluation

class EvaluationDetailSerializer(serializers.ModelSerializer):
    author = UserDetailSerializer(required=False, allow_null=True)
    answers = AnswerDetailSerializer(many=True, source='assessment_answers') 

    class Meta:
        model = Evaluation
        fields = ['id', 'title', 'content', 'author', 'status', 'year', 'establishment', 'level', 'course', 'domain', 'media', 'image', 'create_at', 'last_update_at', 'answers', 'visits']

class FileSerializer(serializers.Serializer):
    text = serializers.CharField(required=False, allow_null=True)
    filename = serializers.CharField(required=False, allow_null=True)

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'user', 'evaluation')

class LikeUserIdSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()