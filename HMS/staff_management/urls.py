# from django
from django.urls import path

# from views
from staff_management.views import StaffProfileListCreateView, StaffProfileDetailView, TaskListCreateView, TaskDetailView

urlpatterns = [
    path('profiles/', StaffProfileListCreateView.as_view(), name='staff_profiles'),
    path('profiles/<int:pk>/', StaffProfileDetailView.as_view(), name='staff_profile_detail'),
    path('tasks/', TaskListCreateView.as_view(), name='tasks'),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task_detail'),
]
