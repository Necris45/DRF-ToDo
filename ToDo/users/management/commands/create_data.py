from django.core.management import BaseCommand

from projects.models import Project, Todo
from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()
        Project.objects.all().delete()
        Todo.objects.all().delete()

        User.objects.create_superuser(username='Necris45', email='necris01@mail.ru', password='1')
        User.objects.create_user(username='Test_admin2', email='test_admin2@mail.ru', password='Qwerty1')
        User.objects.create_user(username='Test_developer2', email='test_developer2@mail.ru', password='Qwerty1')
        User.objects.create_user(username='Test_manager2', email='test_manager2@mail.ru', password='Qwerty1')
