# from django filers
from django_filters import rest_framework as filters

# from models
from staff_management.models import StaffProfile, Task

class StaffProfileFilter(filters.FilterSet):
    department = filters.CharFilter(lookup_expr='icontains')
    job_title = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = StaffProfile
        fields = ['department', 'job_title']


class TaskFilter(filters.FilterSet):
    status = filters.CharFilter(lookup_expr='iexact')

    class Meta:
        model = Task
        fields = ['status']