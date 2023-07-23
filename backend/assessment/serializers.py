from rest_framework import serializers
from assessment.models import Evaluation, Establishment, Course, Domain, Level, Like, Image
from user.serializers import UserDetailSerializer
from forum.serializers import AnswerSerializer, AnswerDetailSerializer
import cloudinary.uploader
from cloudinary_storage.storage import RawMediaCloudinaryStorage

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
        fields = ['id', 'title', 'content', 'author', 'status', 'year', 'establishment', 'level', 'course', 'domain', 'media', 'create_at', 'last_update_at']

    def create_evaluation_with_images(self, validated_data, images):
        title = validated_data.get('title')
        level_data = validated_data.pop('level', None)
        course_data = validated_data.pop('course', None)
        domain_data = validated_data.pop('domain', None)
        establishment_data = validated_data.pop('establishment', None)

        evaluation = Evaluation.objects.create(**validated_data)

        for image in images:
            image_instance = Image.objects.create(name=title, image=image)
            evaluation.images.add(image_instance)
        
        if establishment_data:
            establishment = Establishment.objects.create(**establishment_data)
            evaluation.establishment = establishment

        if level_data:
            level = Level.objects.create(**level_data)
            evaluation.level = level

        if domain_data:
            domain_name = domain_data.get('name')
            domain = Domain.objects.create(name=domain_name)
            evaluation.domain = domain

        if course_data:
            course = Course.objects.create(establishment=evaluation.establishment, domain=evaluation.domain, **course_data)
            evaluation.course = course

        evaluation.save()

        return evaluation

class EvaluationDetailSerializer(serializers.ModelSerializer):
    author = UserDetailSerializer(required=False, allow_null=True)
    answers = AnswerDetailSerializer(many=True, source='assessment_answers') 
    course = CourseSerializer(required=False, allow_null=True)
    domain = DomainSerializer(required=False, allow_null=True)
    level = LevelSerializer(required=False, allow_null=True)
    establishment = EstablishmentSerializer(required=False, allow_null=True)
     

    class Meta:
        model = Evaluation
        fields = ['id', 'title', 'content', 'author', 'status', 'year', 'establishment', 'level', 'course', 'domain', 'media', 'images', 'create_at', 'last_update_at', 'answers', 'visits']

class FileSerializer(serializers.Serializer):
    text = serializers.CharField(required=False, allow_null=True)
    filename = serializers.CharField(required=False, allow_null=True)

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'user', 'evaluation')

class LikeUserIdSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()