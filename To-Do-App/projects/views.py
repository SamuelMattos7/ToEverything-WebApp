from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Projects
from .serializers import ProjectCreationSerializer, ProjectDeleteSerializer, ProjectDetailSerializer, ProjectListSerializer, ProjectUpdateSerializer
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

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def projectUpdateView(request, id):
    try:
        data = request.data.copy()
        project = Projects.objects.get(projectId = id)
        serializer = ProjectUpdateSerializer(project, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Projects.DoesNotExist: 
        return Response({"error":"Project does not exist"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"Details":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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