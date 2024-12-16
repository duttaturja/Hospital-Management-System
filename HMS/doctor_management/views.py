# from django
from django.shortcuts import render
from django.utils.timezone import now
# from rest framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# from models
from .models import DoctorProfile, Appointment

# from serializers
from .serializers import DoctorProfileSerializer, AppointmentSerializer


class DoctorProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'Doctor':
            return Response({"error": "Only doctors can view their profile"}, status=status.HTTP_403_FORBIDDEN)
        try:
            doctor_profile = DoctorProfile.objects.get(user=request.user)
            serializer = DoctorProfileSerializer(doctor_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except DoctorProfile.DoesNotExist:
            return Response({"error": "Doctor profile not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        if request.user.role != 'Admin':
            return Response({'error' : 'Only Admin can create doctor profiles.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = DoctorProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DoctorAppointmentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'Doctor':
            return Response({'error': 'Only doctors can access this resource.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            doctor_profile = DoctorProfile.objects.get(user=request.user)
            appointments = Appointment.objects.filter(doctor=doctor_profile, appointment_time__gte=now())
            serializer = AppointmentSerializer(appointments, many=True)
            return Response(serializer.data)
        except DoctorProfile.DoesNotExist:
            return Response({'error': 'Doctor profile not found.'}, status=status.HTTP_404_NOT_FOUND)


class AppointmentManagementView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != 'Admin':
            return Response({'error': 'Only admins can create appointments.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        if request.user.role != 'Doctor':
            return Response({'error': 'Only doctors can update appointment statuses.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            appointment = Appointment.objects.get(pk=pk)
            serializer = AppointmentSerializer(appointment, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Appointment.DoesNotExist:
            return Response({'error': 'Appointment not found.'}, status=status.HTTP_404_NOT_FOUND)

