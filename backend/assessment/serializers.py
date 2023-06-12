from rest_framework import serializers
from assessment.models import Evaluation, Establishment, Course, Domain, Level

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
    establishment = EstablishmentSerializer(required=False, allow_null=True)
    level = LevelSerializer()
    course = CourseSerializer()
    domain = DomainSerializer()

    class Meta:
        model = Evaluation
        fields = ['id', 'title', 'content', 'author', 'status', 'year', 'establishment', 'level', 'course', 'domain', 'media', 'image']

    def create(self, validated_data):
        establishment_data = validated_data.pop('establishment', None)
        level_data = validated_data.pop('level')
        course_data = validated_data.pop('course')
        domain_data = validated_data.pop('domain')

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

        return evaluation


