from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer
# Create your tests here.
from projects.models import Project, Todo
from projects.views import TodoModelViewSet, ProjectModelViewSet
from users.models import User


class TestViewSet(TestCase):
    def setUp(self):
        self.url_todo = '/api/todo/'
        self.url_project = '/api/project/'
        self.url_users = '/api/users/'
        self.super_user_1 = User.objects.create_superuser('tester001', 'tester001@mail.ru', '4681227124525311')
        self.password_test = '4681227124525311'
        self.username_test = 'tester001'
        self.test_data_projects_update = mixer.blend(Project)

    def test_get_list_projects_unauth(self):
        factory = APIRequestFactory()
        request = factory.get(self.url_project)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_todo_unauth(self):
        factory = APIRequestFactory()
        request = factory.get(self.url_todo)
        todo_view = TodoModelViewSet.as_view({'get': 'list'})
        response = todo_view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_projects_auth(self):
        factory = APIRequestFactory()
        request = factory.get(self.url_project)
        force_authenticate(request, self.super_user_1)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_todo_auth(self):
        factory = APIRequestFactory()
        request = factory.get(self.url_todo)
        force_authenticate(request, self.super_user_1)
        todo_view = TodoModelViewSet.as_view({'get': 'list'})
        response = todo_view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_client_todo_list_unauth(self):
        todo = mixer.blend(Todo)
        client = APIClient()
        response = client.get(f'{self.url_todo}{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_todo_list_auth(self):
        todo = mixer.blend(Todo)
        client = APIClient()
        client.login(username=self.username_test, password=self.password_test)
        response = client.get(f'{self.url_todo}{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_client_todo_put_unauth(self):
        todo = mixer.blend(Todo)
        client = APIClient()
        response = client.put(f'{self.url_todo}{todo.id}/', {"project": [1], 'task_text': 'hgyuwerchgfreyuhg'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_todo_put_auth(self):
        todo = mixer.blend(Todo)
        client = APIClient()
        client.login(username=self.username_test, password=self.password_test)
        response = client.put(f'{self.url_todo}{todo.id}/', {"project": [1], 'task_text': 'hgyuwerchgfreyuhg'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def tearDown(self) -> None:
        pass


class TestTodoProjectAPITestCase(APITestCase):
    def setUp(self):
        self.url_todo = '/api/todo/'
        self.url_project = '/api/project/'
        self.url_users = '/api/users/'
        self.super_user_1 = User.objects.create_superuser('tester001', 'tester001@mail.ru', '4681227124525311')
        self.password_test = '4681227124525311'
        self.username_test = 'tester001'
        self.test_data_project = {'name': 'testCaseProject', 'repo': '', "users": [1]}

    def test_get_list_todo_unauth(self):
        response = self.client.get(self.url_todo)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_todo_auth(self):
        self.client.login(username=self.username_test, password=self.password_test)
        response = self.client.get(self.url_todo)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project(self):
        self.client.login(username=self.username_test, password=self.password_test)
        response = self.client.post(self.url_project, self.test_data_project)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_client_todo_put(self):
        todo = mixer.blend(Todo)
        self.client.login(username=self.username_test, password=self.password_test)
        response = self.client.put(f'{self.url_todo}{todo.id}/', {"project": [1], 'task_text': 'new task for test'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = Todo.objects.get(id=todo.id)
        self.assertEqual(todo.task_text, 'new task for test')

    def tearDown(self) -> None:
        pass
