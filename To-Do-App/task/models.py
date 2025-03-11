from django.db import models
from projects.models import Projects
from django.conf import settings

class Task_Category(models.Model):
    category_Id = models.AutoField(verbose_name="Category_ID", primary_key=True)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name='task_categories_project', null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category_name = models.CharField(verbose_name="categoy_name", max_length=255)

    def __str__(self):
        return self.category_name


class Task(models.Model):

    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"

    label_options = (
        (HIGH, "High"),
        (MEDIUM, "Medium"),
        (LOW, "Low"),
    )

    COMPLETE = "COMPLETED"
    IN_PROGRESS = "IN_PROGRESS"
    NOT_STARTED = "NOT_STARTED"

    status_options = (
        (COMPLETE,'Completed'),
        (IN_PROGRESS,'In progress'),
        (NOT_STARTED,'Not started'),
    )

    Id = models.BigAutoField(primary_key=True, verbose_name="Task_ID")
    tasks_project = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name='tasks_project', null=True, blank=True)
    task_name = models.CharField(verbose_name="Task_name", max_length=255)
    task_status = models.CharField(verbose_name="Task_Status", max_length=12, choices=status_options, default=NOT_STARTED)
    task_category = models.ForeignKey(Task_Category, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    description = models.TextField(verbose_name="Task_description")
    label = models.CharField(verbose_name="Labels", max_length=12, choices=label_options, default=HIGH)
    start_date = models.DateField(verbose_name="Task_start_date", auto_now_add=True)
    end_date = models.DateField(verbose_name="Task_end_date", auto_now_add=False)

    def __str__(self):
        return self.task_name

