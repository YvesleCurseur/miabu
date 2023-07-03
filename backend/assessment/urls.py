from django.urls import path
from .views import CreateEvaluationView, GetEvaluationsView, GetEvaluationByIdView, PDFDownloadView, WordDownloadView, LikeCreateAPIView, LikeDestroyAPIView, EvaluationSearchView
from forum.views import CreateAnswerView

app_name = 'assessment'

urlpatterns = [
    path('add-evaluation/', CreateEvaluationView.as_view(), name='add-evaluation'),
    path('evaluations/', GetEvaluationsView.as_view(), name='get-evaluations'),
    path('evaluation/<int:pk>/', GetEvaluationByIdView.as_view(), name='get-evaluation-by-id'),
    path('download-pdf/', PDFDownloadView.as_view(), name='download-pdf'),
    path('download-word/', WordDownloadView.as_view(), name='download-word'),
    # path('likes/', LikeListCreateAPIView.as_view(), name='like-list-create'),
    # path('likes/<int:pk>/', LikeRetrieveUpdateDestroyAPIView.as_view(), name='like-retrieve-update-destroy'),
    path('likes/create/', LikeCreateAPIView.as_view(), name='like-create'),
    path('likes/<int:pk>/delete/', LikeDestroyAPIView.as_view(), name='like-delete'),
    path('evaluation/', EvaluationSearchView.as_view(), name='evaluation-search'),
    # path('evaluations/<int:evaluation_id>/add-answers/', CreateAnswerView.as_view(), name='create_evaluation_answer')
]
