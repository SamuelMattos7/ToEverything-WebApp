from django.urls import path, include
from projects import views

# In urls.py
urlpatterns = [
    path('list/', views.projectsListView, name="projects-list"),
    path('create/', views.projectCreationView, name="create-project"),
    path('update/<int:id>/', views.projectUpdateView, name="update-project"),
    path('details/<int:id>/', views.projectDetailsView, name="project-details"),
    path('delete/<int:id>/', views.projectDeleteView, name="delete-project"),
]