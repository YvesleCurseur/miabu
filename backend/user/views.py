from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
# import Social Login View
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter

from user.models import NewUser

from .serializers import CustomUserSerializer, LoginUserSerializer, EmailSerializer

# Pour se connecter
class CustomUserCreate(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = CustomUserSerializer

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Pour se déconnecter
class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginUserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = NewUser.objects.get(email=request.data.get('email'))
        if not user.check_password(request.data.get('password')):
            return Response({
                "message": "Provided credentials are not correct.",
            }, status=status.HTTP_400_BAD_REQUEST)
        token = RefreshToken.for_user(user)

        data = {
            "id": user.id,
            "last_name": user.last_name,
            "first_name": user.first_name,
            "email": user.email,
            "username": user.username,
            "is_active": user.is_active,
            "is_social_network": user.is_social_network,
            "date_joined": user.date_joined
        }

        return Response({
            'access_token': str(token.access_token),
            'refresh_token': str(token),
            'user': data,
        }, status=status.HTTP_201_CREATED)

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

# Retreive all users 
class CustomUserListView(APIView):
    def get(self, request):
        users = NewUser.objects.all().order_by('-date_joined')
        serializer = CustomUserSerializer(users, many=True)
        return Response(serializer.data)

class UserDetailView(GenericAPIView):
    serializer_class = EmailSerializer  # Serializer personnalisé pour valider l'e-mail

    # Poster l'e-mail et récupérer les informations de l'utilisateur
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = NewUser.objects.get(email=email)
                serializer = CustomUserSerializer(user)
                return Response(serializer.data)
            except NewUser.DoesNotExist:
                return Response({'message': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

