from django.urls import path
from . import views
from app.api.viewsets import Teste,AdicionarProfessor, DeletarProfessor, AtualizarProfessor
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns  = [
    path('api/professores', Teste.as_view()),
    path('api/adicionar', AdicionarProfessor.as_view()),
    path('api/deletar/<int:pk>', DeletarProfessor.as_view()),
    path('api/atualizar/<int:pk>', AtualizarProfessor.as_view()),
    path('api/token', TokenObtainPairView.as_view()),
    path('api/token/refresh', TokenRefreshView.as_view),

]