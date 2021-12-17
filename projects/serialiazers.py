from rest_framework.serializers import ModelSerializer
from projects.models import Project, Todo


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name', 'repo', 'users',)


class TodoModelSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = ('project', 'task_text', 'created_at', 'updated_at', 'executive_user', 'is_active',)
