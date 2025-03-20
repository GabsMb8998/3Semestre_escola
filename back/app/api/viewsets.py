from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from ..models import Professor, Disciplinas
from .serializer import ProfessorSerializer, UsuarioSerializer, DisciplinasSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from django_filters import rest_framework as filters
from .filters import FiltroProfessorNome, FiltroDisciplinas
from django_filters.views import FilterView
import os
from django.conf import settings
import json

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
    
# class AtualizarProfessor(APIView):

#     permission_classes = [IsAuthenticated]

#     def put(self,request,pk):
        
#         try:
#             professor = Professor.objects.get(pk=pk)
#         except:
#             return Response (status=status.HTTP_404_NOT_FOUND)
        
#         serializer = ProfessorSerializer(professor, data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
        
#         return Response(status=status.HTTP_404_NOT_FOUND)

class AtualizarProfessor(APIView):
    def get_teacher(self,pk):
        return Professor.objects.get(pk=pk)

    def patch(self, request, pk):
        professor = self.get_teacher(pk)
        serializer = ProfessorSerializer(professor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        
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
    def post(self, request, *args, **kwards):

        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
   
        if user is not None:
            return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }, status=status.HTTP_200_OK)
 
    
        return Response(status=status.HTTP_404_NOT_FOUND)
    
# DISCIPLINAS 
class VizualizarDisciplinas(APIView):

    # colocar tratativa de erro 
    def get(self, request):

        disciplinas = Disciplinas.objects.all()
        serializer = DisciplinasSerializer(disciplinas, many=True)
        return Response(serializer.data)

    
class AdicionarDisciplina(APIView):

    def post(self, request):
        serializer = DisciplinasSerializer(data=request.data)

        if serializer.is_valid():

            disciplina_nova = serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_404_NOT_FOUND)
    

class AtualizarDisciplina(APIView):
    
    def patch(self, request, pk):
        disciplinas = Disciplinas.objects.get(pk=pk)
        serializer = DisciplinasSerializer(disciplinas, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_404_NOT_FOUND)
    
class DeletarDisciplina(APIView):
    def delete(self, request, pk):
        disciplina = Disciplinas.objects.get(pk=pk)

        if disciplina:
            disciplina.delete()
            return Response(status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_404_NOT_FOUND)
    
class FiltroDisciplina(APIView):

    def get(self,request):
        filter = FiltroDisciplinas(request.GET, queryset=Disciplinas.objects.all())
        serializer = DisciplinasSerializer(filter.qs, many=True)
        return Response(serializer.data)