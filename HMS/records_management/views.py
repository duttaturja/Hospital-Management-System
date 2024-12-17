# from django
from django.shortcuts import render

# from rest_framework
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# from models
from records_management.models import PatientRecord

# from serializers
from records_management.serializers import PatientRecordSerializer

# from filters
from records_management.filters import PatientRecordFilter

# from permissions
from records_management.permissions import IsAdminOrStaff

class PatientRecordView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role not in ['Admin', 'Staff']:
            return Response({'error': 'Only admins or staff can view records.'}, status=status.HTTP_403_FORBIDDEN)
        records = PatientRecord.objects.all()
        serializer = PatientRecordSerializer(records, many=True)
        return Response(serializer.data)

    def post(self, request):
        if request.user.role not in ['Admin', 'Staff']:
            return Response({'error': 'Only admins or staff can create records.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = PatientRecordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user.username)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            record = PatientRecord.objects.get(pk=pk)
        except PatientRecord.DoesNotExist:
            return Response({'error': 'Record not found.'}, status=status.HTTP_404_NOT_FOUND)

        if request.user.role not in ['Admin', 'Staff']:
            return Response({'error': 'Only admins or staff can update records.'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = PatientRecordSerializer(record, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PatientRecordListCreateView(ListCreateAPIView):
    serializer_class = PatientRecordSerializer
    permission_classes = [IsAuthenticated, IsAdminOrStaff]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = PatientRecordFilter
    search_fields = ['patient__user__full_name', 'diagnosis', 'treatment', 'doctor__user__first_name', 'doctor__user__last_name', 'room__room_number']
    ordering_fields = ['admission_date', 'discharge_date']
    ordering = ['-admission_date']

    def get_queryset(self):
        return PatientRecord.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class PatientRecordRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = PatientRecord.objects.all()
    serializer_class = PatientRecordSerializer
    permission_classes = [IsAuthenticated, IsAdminOrStaff]