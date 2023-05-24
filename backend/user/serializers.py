from rest_framework import serializers
from user.models import NewUser
from django.db import IntegrityError
from rest_framework.exceptions import ValidationError

class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    # Basic
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True, allow_null=True, required=False)
    profile_picture = serializers.URLField(required=False)
    is_social_network = serializers.BooleanField(required=True)

    # Extra
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)

    class Meta:
        model = NewUser
        fields = ('id', 'email', 'username', 'password', 'first_name', 'last_name', 'profile_picture', 'is_social_network')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance, created = self.Meta.model.objects.get_or_create(email=validated_data['email'], defaults=validated_data)
        
        if password is not None:
            instance.set_password(password)
        
        instance.is_social_network = True
        
        try:
            instance.save()
        except IntegrityError as e:
            raise ValidationError("A user with this email already exists.")
        
        return instance

class LoginUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = NewUser
        fields = [ 'email', 'password' ]
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value):
        if NewUser.objects.filter(email=value).exists() is False:
            raise serializers.ValidationError("Provided credentials are not correct.")
        return value
