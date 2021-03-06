from django.db import models
from users.models import User
# Create your models here.


class Project(models.Model):
    name = models.CharField(max_length=50)
    repo = models.URLField(blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        # Добавил отображение id для удобства работы с поиском, позднее хочу попробовать полноценный поиск реализовать
        # именно по названию, но к сожалению мог не успеть, поэтому пока что так
        return f'(id-{self.id}) {self.name}'


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    task_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # в теории указанные условия позволят при удалении пользователя оставить поле исполнителя пустым, чтобы можно
    # было назначить иного исполнителя
    executive_user = models.ForeignKey(User, on_delete = models.SET_NULL, null = True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.id}'
