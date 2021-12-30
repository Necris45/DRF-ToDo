from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Project, Todo
from .serialiazers import ProjectModelSerializer, TodoModelSerializer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import BrowsableAPIRenderer, JSONRenderer
from .filters import ProjectsFilter, TaskFilter
# Create your views here.


class ProjectsLimitPagination(LimitOffsetPagination):
    default_limit = 10


class TaskLimitPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    # pagination_class = ProjectsLimitPagination
    # filterset_class = ProjectsFilter


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    # pagination_class = TaskLimitPagination
    # filterset_class = TaskFilter

    def delete(self, request, *args, ** kwargs):
        self.object = self.get_object()
        if self.object.is_active:
            self.object.is_active = False
        else:
            self.object.is_active = True
        self.object.save()
