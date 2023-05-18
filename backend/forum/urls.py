from django.urls import path
from forum.views import (
    ListTopicView,
    ReadTopicView,
    CreateTopicView,
    DeleteTopicView,
    UpdateTopicView,
    ListAnswerView,
    ReadAnswerView,
    CreateAnswerView,
    DeleteAnswerView,
    UpdateAnswerView,
    TopicListDetailFilter
)

app_name = 'forum'

urlpatterns = [
    path('topics/', ListTopicView.as_view(), name='list-topic'),
    path('topics/<int:pk>', ReadTopicView.as_view(), name='detail-topic'),
    path('add-topic/', CreateTopicView.as_view(), name='add-topic'),
    path('delete-Topic/<int:pk>', DeleteTopicView.as_view(), name='delete-topic'),
    path('update-Topic/<int:pk>', UpdateTopicView.as_view(), name='update-topic'),
    path('search/', TopicListDetailFilter.as_view(), name='search-topic'),

    path('answers/', ListAnswerView.as_view(), name='list-answer'),
    path('answers/<int:pk>', ReadAnswerView.as_view(), name='detail-answer'),
    path('add-answer/', CreateAnswerView.as_view(), name='add-answer'),
    path('delete-answer/<int:pk>', DeleteAnswerView.as_view(), name='delete-answer'),
    path('update-answer/<int:pk>', UpdateAnswerView.as_view(), name='update-answer'),
]
