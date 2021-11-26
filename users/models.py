from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db import models, IntegrityError
from django.contrib.auth.models import AbstractUser
# Create your models here.
from rest_framework import serializers


class User(AbstractUser):
    ADMINISTRATORS = 'ADM'
    PROJECT_MANAGERS = 'PM'
    DEVELOPERS = 'DEV'
    NOT_DEFINED = 'ND'

    WORKER_POSITION_CHOICES = (
        (ADMINISTRATORS, 'Администраторы'),
        (PROJECT_MANAGERS, 'Менеджеры проектов'),
        (DEVELOPERS, 'Разработчики'),
        (NOT_DEFINED, 'Не определена'),
    )

    status = models.CharField(choices=WORKER_POSITION_CHOICES, verbose_name='должность', max_length=3,
                              default=NOT_DEFINED)
    email = models.EmailField(blank=True, unique=True)

    def __str__(self):
        return f'(id-{self.id}){self.username} | position: {self.status}'

    def save(self, *args, **kwargs):
        self.email = self.email.lower()
        self.email = self.__class__.objects.normalize_email(self.email)
        try:
            models.Model.save(self, *args, **kwargs)
        except IntegrityError:
            raise serializers.ValidationError("This email already exists!")
