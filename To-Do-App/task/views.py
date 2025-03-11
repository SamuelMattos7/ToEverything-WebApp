from django.shortcuts import render
from rest_framework import viewsets
from .serializer import TaskCategorySerializer, TaskSerializer
from .models import Task, Task_Category
# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
