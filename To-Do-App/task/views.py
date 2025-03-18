from django.shortcuts import render
from rest_framework import viewsets
from .serializer import TaskCategorySerializer, TaskSerializer, TaskListSerializer, TaskDetailSerializer
from .models import Task, Task_Category
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
