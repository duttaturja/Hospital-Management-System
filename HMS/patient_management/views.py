from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import PatientProfile, Admission, AppointmentBooking
from .serializers import PatientProfileSerializer, AdmissionSerializer, AppointmentBookingSerializer
from user_management.permissions import IsPatient

class PatientProfileView(APIView):
    permission_classes = [IsAuthenticated, IsPatient]

    # FIXED: Added 'pk' parameter to match the URL pattern
    def get(self, request, pk=None):
        if request.user.role != 'Patient':
            return Response({'error': 'Only patients can access this resource.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            # We fetch the profile linked to the currently logged-in user
            patient_profile = PatientProfile.objects.get(user=request.user)
            serializer = PatientProfileSerializer(patient_profile)
            return Response(serializer.data)
        except PatientProfile.DoesNotExist:
            return Response({'error': 'Profile not found.'}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        if request.user.role != 'Patient':
            return Response({'error': 'Only patients can update their profiles.'}, status=status.HTTP_403_FORBIDDEN)

        try:
            # Using request.user ensures users can only edit their own profile
            patient_profile = PatientProfile.objects.get(user=request.user)
        except PatientProfile.DoesNotExist:
            return Response({'error': 'Profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = PatientProfileSerializer(patient_profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdmissionManagementView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != 'Patient':
            return Response({'error': 'Only patients can admit themselves.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = AdmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        if request.user.role != 'Patient':
            return Response({'error': 'Only patients can view their admissions.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            patient_profile = PatientProfile.objects.get(user=request.user)
            admissions = patient_profile.admissions.all()
            serializer = AdmissionSerializer(admissions, many=True)
            return Response(serializer.data)
        except PatientProfile.DoesNotExist:
            return Response({'error': 'Profile not found.'}, status=status.HTTP_404_NOT_FOUND)


class AppointmentBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != 'Patient':
            return Response({'error': 'Only patients can book appointments.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = AppointmentBookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        if request.user.role != 'Patient':
            return Response({'error': 'Only patients can view their appointments.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            patient_profile = PatientProfile.objects.get(user=request.user)
            appointments = patient_profile.appointments.all()
            serializer = AppointmentBookingSerializer(appointments, many=True)
            return Response(serializer.data)
        except PatientProfile.DoesNotExist:
            return Response({'error': 'Profile not found.'}, status=status.HTTP_404_NOT_FOUND)