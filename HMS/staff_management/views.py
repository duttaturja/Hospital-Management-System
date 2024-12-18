# from rest framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

# from models
from staff_management.models import StaffProfile, Task

# from serializers
from .serializers import StaffProfileSerializer, TaskSerializer


class StaffProfileListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = StaffProfile.objects.all()
    serializer_class = StaffProfileSerializer

    def perform_create(self, serializer):
        if self.request.user.role != 'Admin':
            raise PermissionError("Only admins can create staff profiles.")
        serializer.save()

class StaffProfileDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = StaffProfile.objects.all()
    serializer_class = StaffProfileSerializer

    def perform_update(self, serializer):
        if self.request.user.role != 'Admin':
            raise PermissionError("Only admins can update staff profiles.")
        serializer.save()


class TaskListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        if self.request.user.role != 'Admin':
            raise PermissionError("Only admins can assign tasks.")
        serializer.save(assigned_by=self.request.user)


class TaskDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_update(self, serializer):
        task = self.get_object()
        if self.request.user.role != 'Admin' and self.request.user != task.assigned_by:
            raise PermissionError("You do not have permission to update this task.")
        serializer.save()
