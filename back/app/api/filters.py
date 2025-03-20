import django_filters
from ..models import Professor,Disciplinas



class FiltroProfessorNome(django_filters.FilterSet):
    nome = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Professor
        fields = ['nome']

class FiltroDisciplinas(django_filters.FilterSet):
    codigo = django_filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = Disciplinas
        fields = ['codigo']