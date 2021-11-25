from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from projects.models import Project, Todo
from projects.serialiazers import ProjectModelSerializer, TodoModelSerializer
# Create your views here.


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
