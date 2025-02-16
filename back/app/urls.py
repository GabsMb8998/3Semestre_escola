from django.urls import path, include
from . import views
from app.api.viewsets import VizualizarProfessores,AdicionarProfessor, DeletarProfessor, AtualizarProfessor,CadastroUsuario, VizualizarProfessoresId, ProfessorByNome, LoginUser
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from django.conf.urls.static import static
from django.conf import settings

urlpatterns  = [
    path('api/professores', VizualizarProfessores.as_view()),
    path('api/professor/<int:pk>', VizualizarProfessoresId.as_view()),
    path('api/adicionar', AdicionarProfessor.as_view()),
    path('api/deletar/<int:pk>', DeletarProfessor.as_view()),
    path('api/atualizar/<int:pk>', AtualizarProfessor.as_view()),
    path('api/token', TokenObtainPairView.as_view()),
    path('api/token/refresh', TokenRefreshView.as_view()),
    path('api/cadastro', CadastroUsuario.as_view()),
    path('api/filtros/professor/', ProfessorByNome.as_view()),
    path('api/login', LoginUser.as_view()),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)