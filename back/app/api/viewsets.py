from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from ..models import Professor
from .serializer import ProfessorSerializer, UsuarioSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from django_filters import rest_framework as filters
from .filters import FiltroProfessorNome
from django_filters.views import FilterView
import os
from django.conf import settings

from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login

class VizualizarProfessores(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        professores = Professor.objects.all()
        serializer = ProfessorSerializer(professores, many=True)
        return Response(serializer.data)
    
class VizualizarProfessoresId(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        professor = get_object_or_404(Professor, pk=pk)
        serializer = ProfessorSerializer(professor)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class AdicionarProfessor(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        
        serializer = ProfessorSerializer(data=request.data)

        if serializer.is_valid():

            Professor_novo = serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_404_NOT_FOUND)
    
class DeletarProfessor(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self,request, pk):

        try:
            print(pk)
            professor = Professor.objects.get(pk=pk)
            caminho_imagem = os.path.join(settings.MEDIA_ROOT, professor.imagem.name)
            if os.path.exists(caminho_imagem):
                os.remove(caminho_imagem)

                pasta_imagem = os.path.dirname(caminho_imagem)
                if not os.listdir(pasta_imagem):
                    os.rmdir(pasta_imagem)

        except Professor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        professor.delete()
        return Response(status=status.HTTP_200_OK)
    
class AtualizarProfessor(APIView):

    permission_classes = [IsAuthenticated]

    def put(self,request,pk):
        
        try:
            professor = Professor.objects.get(pk=pk)
        except:
            return Response (status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProfessorSerializer(professor, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_404_NOT_FOUND)
    
class CadastroUsuario(APIView):
    def post(self, request):
        try: 
            username= request.data.get('username')
            password=request.data.get('password')

            user = User.objects.create_user(username=username, password=password)
            return Response({"message": "Usuário criado com sucesso!"}, status=status.HTTP_201_CREATED)
        except:
            # print(username, password)
            return Response(status=status.HTTP_404_NOT_FOUND)


# Filtros 

class ProfessorByNome(APIView):

    def get(self,request):
        model= Professor
        filterset_class = FiltroProfessorNome
        filter = FiltroProfessorNome(request.GET, queryset=Professor.objects.all())
        serializer = ProfessorSerializer(filter.qs, many=True)
        return  Response(serializer.data) 

class LoginUser(APIView):
    def post(self, request):
        form = AuthenticationForm(request, data=request.POST)
        
        print(form, 'esse é o forma')
        if form.is_valid():
            user = form.get_user()
            login(request, user)

            return Response(status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_404_NOT_FOUND)