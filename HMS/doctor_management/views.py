# from django
from django.shortcuts import render
from django.utils.timezone import now
# from rest framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# from models
from doctor_management.models import DoctorProfile, Appointment

# from serializers
from doctor_management.serializers import DoctorProfileSerializer, AppointmentSerializer

# from oermissions
from doctor_management.permissions import IsAdminOrDoctor, IsDoctorOnly

class DoctorProfileView(APIView):
    permission_classes = [IsAuthenticated, IsDoctorOnly]

    def get(self, request):
        try:
            doctor_profile = DoctorProfile.objects.get(user=request.user)
            serializer = DoctorProfileSerializer(doctor_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except DoctorProfile.DoesNotExist:
            return Response({"error": "Doctor profile not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        
        serializer = DoctorProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DoctorAppointmentsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminOrDoctor]

    def get(self, request):
        
        try:
            doctor_profile = DoctorProfile.objects.get(user=request.user)
            appointments = Appointment.objects.filter(doctor=doctor_profile, appointment_time__gte=now())
            serializer = AppointmentSerializer(appointments, many=True)
            return Response(serializer.data)
        except DoctorProfile.DoesNotExist:
            return Response({'error': 'Doctor profile not found.'}, status=status.HTTP_404_NOT_FOUND)


class AppointmentManagementView(APIView):
    permission_classes = [IsAuthenticated, IsAdminOrDoctor]

    def post(self, request):
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        try:
            appointment = Appointment.objects.get(pk=pk)
            serializer = AppointmentSerializer(appointment, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Appointment.DoesNotExist:
            return Response({'error': 'Appointment not found.'}, status=status.HTTP_404_NOT_FOUND)

