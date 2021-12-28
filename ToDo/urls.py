"""ToDo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter, SimpleRouter
from users.views import UsersCustomViewSet
from projects.views import ProjectModelViewSet, TodoModelViewSet
from rest_framework.authtoken import views
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from django.views.generic import TemplateView

router = DefaultRouter()
router.register('users', UsersCustomViewSet)
router.register('project', ProjectModelViewSet)
router.register('todo', TodoModelViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title='ToDo',
        default_version='0.2',
        description='Documentation for the ToDo project',
        contact=openapi.Contact(email='Necris01@mail.ru'),
        license=openapi.License(name='ToDo test License'),
    ),
    public=True,
    permission_classes=(AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token),
    path('api/', include(router.urls)),
    path('', TemplateView.as_view(template_name='index.html')),
    path('login/', TemplateView.as_view(template_name='index.html')),
    path('users/', TemplateView.as_view(template_name='index.html')),
    path('projects/', TemplateView.as_view(template_name='index.html')),
    path('projects/<int:projects_id>/', TemplateView.as_view(template_name='index.html')),
    path('project/create/', TemplateView.as_view(template_name='index.html')),
    path('todo/', TemplateView.as_view(template_name='index.html')),
    path('todo/create', TemplateView.as_view(template_name='index.html')),
    path('swagger/', schema_view.with_ui('swagger')),
    path('swagger/<str:format>/', schema_view.without_ui()),
    path('redoc/', schema_view.with_ui('redoc')),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
]
