from rest_framework import serializers
from .models import Task, Task_Category

class TaskSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = '__all__'

class TaskListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = ['Id', 'task_name', 'task_status', 'task_category', 'label']


class TaskDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'

class TaskCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task_Category
        fields = '__all__'