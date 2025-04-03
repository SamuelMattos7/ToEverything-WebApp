from django.urls import path, include
from rest_framework import routers
from task import views

# In urls.py
urlpatterns = [
    path('list/', views.taskListView, name='task-list'),
    path('create/', views.TaskCreationView, name='task-creation'),
    path('details/<int:id>/', views.taskDetailView, name='task-details'),
    path('update/<int:id>/', views.taskUpdateView, name='task-update'),
    path('delete/<int:id>/', views.taskDeleteView, name='task-delete'),
    path('categories/', views.CategoryListView, name='category-list'),
    path('category/create/', views.TaskCategoryCreateView, name="create-category"),
    path('category/details/<int:id>/', views.taskDetailView, name='task-details'),
    path('category/update/<int:id>/', views.categoryUpdateView, name="update-category"),
    path('category/delete/<int:id>/', views.CategoryDeleteView, name='delete-category'),
]