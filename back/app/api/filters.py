import django_filters
from ..models import Professor


class FiltroProfessorNome(django_filters.FilterSet):
    nome = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Professor
        fields = ['nome']