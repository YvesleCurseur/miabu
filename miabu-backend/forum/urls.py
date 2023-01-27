from django.urls import path
from forum.views import (
    ListQuestionView,
    ReadQuestionView,
    CreateQuestionView,
    DeleteQuestionView,
    UpdateQuestionView,
    ListAnswerView,
    ReadAnswerView,
    CreateAnswerView,
    DeleteAnswerView,
    UpdateAnswerView,
    QuestionListDetailFilter
)

app_name = 'forum'

urlpatterns = [
    path('questions/', ListQuestionView.as_view(), name='list-question'),
    path('questions/<int:pk>', ReadQuestionView.as_view(), name='detail-question'),
    path('add-question/', CreateQuestionView.as_view(), name='add-question'),
    path('delete-question/<int:pk>', DeleteQuestionView.as_view(), name='delete-question'),
    path('update-question/<int:pk>', UpdateQuestionView.as_view(), name='update-question'),
    path('search/', QuestionListDetailFilter.as_view(), name='search-question'),

    path('answers/', ListAnswerView.as_view(), name='list-answer'),
    path('answers/<int:pk>', ReadAnswerView.as_view(), name='detail-answer'),
    path('add-answer/', CreateAnswerView.as_view(), name='add-answer'),
    path('delete-answer/<int:pk>', DeleteAnswerView.as_view(), name='delete-answer'),
    path('update-answer/<int:pk>', UpdateAnswerView.as_view(), name='update-answer'),
]
