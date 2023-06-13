from django.urls import path
from .views import *

app_name = 'assessment'

urlpatterns = [
    path('add-evaluation/', CreateEvaluationView.as_view(), name='add-evaluation'),
    path('evaluations/', GetEvaluationsView.as_view(), name='get-evaluations'),
]
