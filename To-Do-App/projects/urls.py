from django.urls import path, include
from projects import views

# In urls.py
urlpatterns = [
    path('list', views.projectsListView, name="projects-list"),
]