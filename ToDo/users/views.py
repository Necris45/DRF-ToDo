from django.shortcuts import render
from .models import User
from .serialiazers import UserModelSerializer, UserModelSerializerBase
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import GenericViewSet, ModelViewSet
# Create your views here.


class UsersCustomViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserModelSerializerBase
        return UserModelSerializer

# для проверки ссылка "http://127.0.0.1:8000/api/users/?version=0.2"