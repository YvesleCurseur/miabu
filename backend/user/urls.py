from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView

from dj_rest_auth.registration.views import SocialLoginView

# icnlude 
from django.urls import include 

app_name = 'user'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="register_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    # social auth
    path('rest-auth/facebook/', SocialLoginView.as_view(), name='facebook_auth'),
    path('rest-auth/google/', SocialLoginView.as_view(), name='google_auth'),
    # path('rest-auth/', include('rest_auth.urls')),
    # path('rest-auth/registration/', include('rest_auth.registration.urls')),
]