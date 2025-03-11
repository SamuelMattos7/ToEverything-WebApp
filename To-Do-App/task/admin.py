from django.contrib import admin
from task.models import Task, Task_Category
# Register your models here.
admin.site.register(Task_Category)
admin.site.register(Task)