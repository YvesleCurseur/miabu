from django.urls import path
from .views import CustomUserCreate, FacebookLogin, GoogleLogin, CustomUserListView, LoginUserView, UserDetailView, UserLikesAPIView

from dj_rest_auth.registration.views import SocialLoginView

# icnlude 
from django.urls import include 

app_name = 'user'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="register_user"),
    path('login/', LoginUserView.as_view(), name="login"),
    # path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('list-users/', CustomUserListView.as_view(), name='list_users'),
    path('detail-user/', UserDetailView.as_view(), name='detail_user'),
    # social auth
    path('rest-auth/facebook/', GoogleLogin.as_view(), name='facebook_auth'),
    path('rest-auth/google/', FacebookLogin.as_view(), name='google_auth'),
    path('likes/', UserLikesAPIView.as_view(), name='user_likes'),

    # path('rest-auth/', include('rest_auth.urls')),
    # path('rest-auth/registration/', include('rest_auth.registration.urls')),
]