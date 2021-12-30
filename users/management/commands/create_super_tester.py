from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.create_superuser(username='super-tester', email='super-tester@mail.ru', password='1')
        User.objects.create_user(username='Test_admin', email='test_admin@mail.ru', password='Qwerty1')
        User.objects.create_user(username='Test_developer', email='test_developer@mail.ru', password='Qwerty1')
        User.objects.create_user(username='Test_manager', email='test_manager@mail.ru', password='Qwerty1')
