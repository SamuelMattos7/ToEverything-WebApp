from rest_framework import serializers
from .models import Task, Task_Category

class TaskSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = '__all__'

class TaskListSerializer(serializers.ModelSerializer):
    task_category = serializers.StringRelatedField()
    
    class Meta:
        model = Task
        fields = ['Id', 'task_name', 'task_status', 'task_category', 'label']

class TaskCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class TaskDetailSerializer(serializers.ModelSerializer):
    task_category = serializers.StringRelatedField()
    
    class Meta:
        model = Task
        fields = '__all__'

class TaskEditSerializer(serializers.ModelSerializer):
    task_category = serializers.PrimaryKeyRelatedField(
        queryset=Task_Category.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:
        model = Task
        fields = ['Id', 'tasks_project', 'task_name', 'task_status', 'task_category', 'description', 'label']

class TaskDeletionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = ['Id']

class TaskCategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task_Category
        fields = ['id', 'category_name']

class TaskCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task_Category
        fields = '__all__'

class TaskCategoryEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task_Category
        fields = '__all__'