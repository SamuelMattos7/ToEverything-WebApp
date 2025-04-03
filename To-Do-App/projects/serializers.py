from rest_framework import serializers
from .models import Projects

class ProjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ['projectId', 'project_name']