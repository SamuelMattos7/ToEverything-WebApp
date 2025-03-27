from django.shortcuts import render
from rest_framework import status
from .serializer import *
from .models import Task, Task_Category
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
# Create your views here.

@api_view(['GET'])
def taskListView(request):
    if request.method == 'GET':
        list_of_tasks = Task.objects.only('Id', 'task_name', 'task_status', 'task_category', 'label')
        serializer = TaskListSerializer(list_of_tasks, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def TaskCreationView(request):
    if request.method == 'POST':
        data = request.data.copy()
        data['user'] = request.user.UserID
        serializer = TaskCreationSerializer(data=data) 
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def taskDetailView(request, id):
    if request.method == 'GET':
        try:
            task = Task.objects.get(Id=id)
            serializer = TaskDetailSerializer(task)
            return Response(serializer.data)
        except Task.DoesNotExist:
            return Response({"detail":"Task was not found"}, status=404)

@api_view(['PUT'])
def taskUpdateView(request, id):
    try:
        task = Task.objects.get(Id=id)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = TaskEditSerializer(task, data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
@api_view(['DELETE'])
def taskDeleteView(request, id):
    try:
        task = Task.objects.get(Id=id)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    task.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

