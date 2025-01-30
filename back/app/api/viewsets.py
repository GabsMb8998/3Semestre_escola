from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Professor
from .serializer import ProfessorSerializer
from rest_framework.permissions import IsAuthenticated

class VizualizarProfessores(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        professores = Professor.objects.all()
        serializer = ProfessorSerializer(professores, many=True)
        return Response(serializer.data)
    

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

        