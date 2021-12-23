import graphene
from graphene import String, Int, List, ID
from graphene_django import DjangoObjectType
from projects.models import Todo, Project
from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_project = graphene.List(ProjectType)
    all_todo = graphene.List(TodoType)
    user_by_username = graphene.Field(UserType, username=String(required=True))

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_project(root, info):
        return Project.objects.all()

    def resolve_all_todo(root, info):
        return Todo.objects.all()

    def resolve_user_by_username(self, info, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)
# Запрос для вывода всех пользователей:
# {allUsers{id username firstName lastName email isStaff isSuperuser}}
# Запрос для вывода всех проектов с указанием ссылки на репозиторий и участвующих пользователей с некоторыми данными:
# {allProject{id name repo users{id username}}}
# Следующий запрос вернет все задачи с указанием id задачи, текста задачи, проекта (название + список пользователей,
# участвующих в проекте, с указанием их id, имени пользователя, фамилии и имени), и исполнителя задачи (с указанием
# их id, имени пользователя, фамилии и имени):
# {allTodo{id taskText project{name, users {id username firstName lastName}}
# executiveUser{id username firstName lastName}}}
# Также попробовал реализовать поиск по имени пользователя всех прочих данных по этому пользователю:
# {userByUsername(username:"!(в кавычки вписываем искомый username)!")
# {id username firstName lastName email isStaff isSuperuser}} - в этой части передаем все требуемые поля по искомому
# пользователю.
