from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from task import serializer
from .models import Projects
from .serializers import ProjectCreationSerializer, ProjectDeleteSerializer, ProjectDetailSerializer, ProjectListSerializer
from rest_framework.response import Response
# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def projectsListView(request):
    list_projects = Projects.objects.filter(creator=request.user)
    serializer = ProjectListSerializer(list_projects, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def projectCreationView(request):
    data = request.data.copy()
    data['user'] = request.user.UserID
    serializer = ProjectCreationSerializer(data=data)
    if serializer.is_valid():
        serializer.save(creator=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def projectDetailsView(request, id):
    try:
        project = Projects.objects.get(projectId=id)
        serializer = ProjectDetailSerializer(project)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Projects.DoesNotExist:
            return Response({"error":"Project was not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def projectDeleteView(request, id):
    try:
        project = Projects.objects.get(projectId=id)
        serializer = ProjectDeleteSerializer(project)
        project.delete()
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
    except Projects.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)