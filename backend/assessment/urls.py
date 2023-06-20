from django.urls import path
from .views import CreateEvaluationView, GetEvaluationsView, GetEvaluationByIdView
from forum.views import CreateAnswerView

app_name = 'assessment'

urlpatterns = [
    path('add-evaluation/', CreateEvaluationView.as_view(), name='add-evaluation'),
    path('evaluations/', GetEvaluationsView.as_view(), name='get-evaluations'),
    path('evaluation/<int:pk>/', GetEvaluationByIdView.as_view(), name='get-evaluation-by-id'),
    # path('evaluations/<int:evaluation_id>/add-answers/', CreateAnswerView.as_view(), name='create_evaluation_answer'),

]
