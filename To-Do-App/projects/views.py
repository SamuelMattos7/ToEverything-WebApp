from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Projects
from .serializers import ProjectListSerializer
from rest_framework.response import Response
# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def projectsListView(request):
    list_projects = Projects.objects.filter(creator=request.user)
    serializer = ProjectListSerializer(list_projects, many=True)
    return Response(serializer.data)