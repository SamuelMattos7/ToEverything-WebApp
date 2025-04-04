from django.db import models
from django.conf import settings

class Projects(models.Model):
    projectId = models.BigAutoField(primary_key=True, verbose_name="Project_ID")
    project_name = models.CharField(verbose_name="Project_name", max_length=255, unique=True)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="project_owner")
    project_description = models.TextField(verbose_name="Project_description", blank=True)
    project_startDate = models.DateField(verbose_name="project_startDate", auto_now_add=False, null=True, blank=True)
    project_endDate = models.DateField(verbose_name="project_endDate", auto_now_add=False, null=True, blank=True) # only null and blank for now
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)

    def __str__(self):
        return self.project_name
    
