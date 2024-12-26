# from django
from django.urls import path

# from views
from staff_management.views import StaffProfileView, TaskListCreateView, TaskDetailView

urlpatterns = [
    path('profiles/<int:pk>/', StaffProfileView.as_view(), name='staff_profile'),
    path('tasks/', TaskListCreateView.as_view(), name='tasks'),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task_detail'),
]
