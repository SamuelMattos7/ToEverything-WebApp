from rest_framework import serializers
from .models import Projects

class ProjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ['projectId', 'project_name']

class ProjectCreationSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Projects
        fields = ['project_name', 'creator', 'project_description', 'project_startDate', 'project_endDate', 'users']

class ProjectUpdateSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Projects
        fields = ['projectId', 'project_name', 'project_description', 'project_startDate', 'project_endDate', 'users']
        read_only_fields = ['projectId']

class ProjectDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = '__all__'

class ProjectDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ['projectId']