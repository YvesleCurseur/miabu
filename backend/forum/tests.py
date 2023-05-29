from urllib import response
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from forum.models import Topic

class Test_Create_Topic(TestCase):

    @classmethod
    # On crée des données pour faire les test
    def setUpTestData(cls):

        test_user1 = User.objects.create_user(
            username='YLC', 
            password='12345'
            )

        test_topic = Topic.objects.create(
            title='You just create a question ?',
            content='I think i have the possibility to create a question for my test case.',
            slug='you-just-create-a-question',
            author_id=1,
            status='publish'
            )
    # Vérification du contenu d'une question
    def test_question_content(self):
        question = Topic.objects.get(id=1)
        author = f'{question.author}'
        title = f'{question.title}'
        content = f'{question.content}'
        status = f'{question.status}'

        # Vérifie si les données crées en haut match avec le contenu de cette question
        self.assertEqual(author, 'YLC')
        self.assertEqual(title, 'You just create a question ?')
        self.assertEqual(content, 'I think i have the possibility to create a question for my test case.')
        self.assertEqual(status, 'published')
        self.assertEqual(str(question), 'You just create a question ?')

class QuestionTest(APITestCase):

    def test_view_questions(self):
        # Test l'url
        url = reverse('forum:list-question')
        # Test la réponse en simulant un navigateur
        response = self.client.get(url, format='json')
        # Vérifie si la réponse est de 200
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_questions(self):
        self.test_user1 = User.objects.create_user(username='YLC', password='12345')
        data = {
            "title":"New",
            "author":1, 
            "content":"New content"
        }
        url = reverse('forum:add-question')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)