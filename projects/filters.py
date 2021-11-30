from django_filters.rest_framework import FilterSet, CharFilter, NumberFilter
from projects.models import Project, Todo


class ProjectsFilter(FilterSet):
    name = CharFilter(lookup_expr='contains')
    # В дальнейшем хочу добавить поиск по участвующим пользователям, но пока есть сомнения по реализации
    class Meta:
        model = Project
        fields = ['name']


class TaskFilter(FilterSet):
    project = CharFilter()
    created_at = NumberFilter(field_name='created_at', lookup_expr='day')
    # gte и lte использую, чтобы можно было выбрать конкретную дату в одном из двух полей и не потерять в поисковой
    # выдаче данные за указанный день, очень понравилась подсказка, которую рисует Django. Также в планах реализовать
    # поиск по пользователю, но позднее.
    created_at__gt = NumberFilter(field_name='created_at', lookup_expr='day__gte')
    created_at__lt = NumberFilter(field_name='created_at', lookup_expr='day__lte')

    class Meta:
        model = Todo
        fields = ['project', 'created_at']
