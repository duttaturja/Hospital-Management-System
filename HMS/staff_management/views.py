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

# from permissions
from user_management.permissions import IsStaff


class StaffProfileView(APIView):
    permission_classes = [IsAuthenticated, IsStaff]

    def get(self, request):
        if request.user.role != 'Staff':
            return Response({'error': 'Only patients can access this resource.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            patient_profile = StaffProfile.objects.get(user=request.user)
            serializer = StaffProfileSerializer(patient_profile)
            return Response(serializer.data)
        except StaffProfile.DoesNotExist:
            return Response({'error': 'Profile not found.'}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request):
        if request.user.role != 'Patient':
            return Response({'error': 'Only patients can create their profiles.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = StaffProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
