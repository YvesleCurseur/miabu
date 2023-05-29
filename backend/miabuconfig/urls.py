
from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework import routers, permissions
from rest_framework.documentation import include_docs_urls
from forum import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from rest_framework_simplejwt.views import (
   TokenObtainPairView,
   TokenRefreshView,
)

schema_view = get_schema_view(
   openapi.Info(
      title="Miabu Susu",
      default_version='v1',
      description="Api to manage the backend of the forum Miabu Susu",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="yveslecurseur0.0@gmail.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

BASE_PATH = 'v1'

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
   # Swagger
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

   # DRF
    path(f'{BASE_PATH}/', include_docs_urls(title='Miabu Susu API', public=True)),
    path(f'{BASE_PATH}/admin/', admin.site.urls),
    path(f'{BASE_PATH}/api-auth/', include('rest_framework.urls', namespace='rest_framework')),

   # Token
    path(f'{BASE_PATH}/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(f'{BASE_PATH}/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

   # allauth
    path(f'{BASE_PATH}/accounts/', include('allauth.urls')),

   # The app
    path(f'{BASE_PATH}/forum/', include('forum.urls')),
    path(f'{BASE_PATH}/user/', include('user.urls', namespace='user')),
    path(f'{BASE_PATH}/hello-world/', views.hello_world, name='hello-world'),
]