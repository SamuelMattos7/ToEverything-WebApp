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

class TaskCalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['task_name', 'end_date'] 

class TaskCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class TaskDetailSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source='user.username', read_only=True)
    
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

class CategoryInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task_Category
        fields = ['id', 'project', 'category_name']

class CategoryListViewSerializer(serializers.ModelSerializer):
    task_count = serializers.SerializerMethodField()

    class Meta:
        model = Task_Category
        fields = ['id', 'category_name', 'task_count']
    
    def get_task_count(self, obj):
        return obj.task_set.count()

class TaskCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task_Category
        fields = '__all__'

class TaskCategoryEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task_Category
        fields = '__all__'