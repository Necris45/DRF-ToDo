from rest_framework.serializers import ModelSerializer
from projects.models import Project, Todo
from users.models import User


class UserSerializerForProjects:
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)


class ProjectModelSerializerBase(ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name', 'repo', 'users',)


class ProjectModelSerializer(ModelSerializer):
    users = UserSerializerForProjects
    class Meta:
        model = Project
        fields = ('id', 'name', 'repo', 'users',)


class TodoModelSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = ('project', 'task_text', 'created_at', 'updated_at', 'executive_user', 'is_active',)
