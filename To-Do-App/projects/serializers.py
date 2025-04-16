from rest_framework import serializers
from .models import Projects
from users.models import User

class ProjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ['projectId', 'project_name']

class ProjectCreationSerializer(serializers.ModelSerializer):
    collaborator_emails = serializers.ListField(
        child=serializers.EmailField(),
        write_only=True,
        required=False
    )

    class Meta: 
        model = Projects
        fields = ['project_name', 'creator', 'project_description', 'project_startDate', 'project_endDate', 'users', 'collaborator_emails']
        extra_kwargs = {
            'users':{'required':False}
        }

    def create(self, validated_data):

        collaborator_emails = validated_data.pop('collaborator_emails', [])
        project = Projects.objects.create(**validated_data)
        print("Collaborator emails:", collaborator_emails)

        for email in collaborator_emails:
            try: 
                user = User.objects.get(email=email)
                project.users.add(user)
            except User.DoesNotExist:
                pass
            
        return project
    
class ProjectUpdateSerializer(serializers.ModelSerializer):
    
    collaborator_emails = serializers.ListField(
        child=serializers.EmailField(),
        write_only=True,
        required = False
    )

    users = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta: 
        model = Projects
        fields = ['projectId', 'project_name', 'project_description', 'project_startDate', 'project_endDate', 'users', 'collaborator_emails']

    def update(self, instance, validated_data):

        collaborator_emails = validated_data.pop('collaborator_emails', None)

        instance.project_name = validated_data.get('project_name', instance.project_name)
        instance.project_description = validated_data.get('project_description', instance.project_description)
        instance.project_startDate = validated_data.get('project_startDate', instance.project_startDate)
        instance.project_endDate = validated_data.get('project_endDate', instance.project_endDate)
        instance.save()

        if collaborator_emails is not None:
            instance.users.clear()
            for email in collaborator_emails:
                try:
                    user = User.objects.get(email=email)
                    instance.users.add(user)
                except User.DoesNotExist:
                    pass

        return instance
    
class ProjectDetailSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()

    class Meta:
        model = Projects
        fields = ['projectId', 'project_name', 'project_description', 'project_startDate', 'project_endDate', 'users']

    def get_users(self, obj):
        return[
            {
                'id':user.UserID, 
                'username': user.username, 
                'email': user.email
            }
            for user in obj.users.all()
        ]

class ProjectDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ['projectId']