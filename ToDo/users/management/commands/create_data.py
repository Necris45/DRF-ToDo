from django.core.management import BaseCommand

from projects.models import Project, Todo
from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.create_superuser(username='Necris45', email='necris01@mail.ru', password='1')
        User.objects.create_user(username='Test_admin2', email='test_admin2@mail.ru', password='Qwerty1')
        User.objects.create_user(username='Test_developer2', email='test_developer2@mail.ru', password='Qwerty1')
        User.objects.create_user(username='Test_manager2', email='test_manager2@mail.ru', password='Qwerty1')

        project_1 = Project.objects.create(name='Первый проект', repo="")
        project_1.users.set([1,2,3])
        project_2 = Project.objects.create(name='Второй проект', repo="", users = [1,3,4])
        project_2.users.set([1,3,4])
        project_3 = Project.objects.create(name='Третий проект', repo="", users = [2,3,4])
        project_3.users.set([2,3,4])

        Todo.objects.create(project=1, executive_user=2,task_text='первая задача')
        Todo.objects.create(project=2, executive_user=3, task_text='Вторая задача')
        Todo.objects.create(project=3, executive_user=4, task_text='Третья задача')