# from rest framework
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

# from models
from .models import Salary, Invoice

# from serializers
from .serializers import SalarySerializer, InvoiceSerializer

# from permissions
from bill_management.permissions import IsAdminOnly, IsEmployeeOrAdmin, IsPatientOnly

class SalaryListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsAdminOnly]
    queryset = Salary.objects.all()
    serializer_class = SalarySerializer

    def perform_create(self, serializer):
        if self.request.user.role != 'Admin':
            raise PermissionError("Only admins can manage salaries.")
        
        user = serializer.validated_data.get('user')
        if not any([
            hasattr(user, 'doctorprofile'),
            hasattr(user, 'nurseprofile'),
            hasattr(user, 'staffprofile')
        ]):
            raise ValidationError("The selected user does not have a valid profile.")
        
        serializer.save()

class SalaryDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsEmployeeOrAdmin]
    queryset = Salary.objects.all()
    serializer_class = SalarySerializer

    def perform_update(self, serializer):
        if self.request.user.role != 'Admin':
            raise PermissionError("Only admins can update salaries.")
        
        user = serializer.validated_data.get('user')
        if not any([
            hasattr(user, 'doctorprofile'),
            hasattr(user, 'nurseprofile'),
            hasattr(user, 'staffprofile')
        ]):
            raise ValidationError("The selected user does not have a valid profile.")
        
        serializer.save()

class InvoiceListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsAdminOnly]
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    def perform_create(self, serializer):
        if self.request.user.role != 'Admin':
            raise PermissionError("Only admins can generate invoices.")
        serializer.save()

class InvoiceDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsPatientOnly]
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    def perform_update(self, serializer):
        if self.request.user.role != 'Admin':
            raise PermissionError("Only admins or accountants can update invoices.")
        serializer.save()