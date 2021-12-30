from django.core.management import BaseCommand

from projects.models import Project, Todo
from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.create_superuser(username='Necris45', email='necris01@mail.ru', password='1')
        User.objects.create_user(username='Test_admin', email='test_admin@mail.ru', password='Qwerty1')
        User.objects.create_user(username='Test_developer', email='test_developer@mail.ru', password='Qwerty1')
        User.objects.create_user(username='Test_manager', email='test_manager@mail.ru', password='Qwerty1')

        Project.objects.create(name='Первый проект', repo="", users = [1,2,4])
        Project.objects.create(name='Второй проект', repo="", users = [1,3,4])
        Project.objects.create(name='Третий проект', repo="", users = [2,3,4])

        Todo.objects.create(project=1, executive_user=2,task_text='первая задача')
        Todo.objects.create(project=2, executive_user=3, task_text='Вторая задача')
        Todo.objects.create(project=3, executive_user=4, task_text='Третья задача')