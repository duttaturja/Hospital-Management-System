from rest_framework import serializers
from .models import PatientProfile, Admission, AppointmentBooking

class PatientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientProfile
        fields = ['id', 'user', 'date_of_birth', 'address', 'contact_number', 'emergency_contact', 'medical_history', 'assigned_doctor']
        depth = 1

class AdmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admission
        fields = ['id', 'patient', 'admission_date', 'discharge_date', 'reason', 'room']

class AppointmentBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentBooking
        fields = ['id', 'patient', 'doctor', 'appointment_date', 'symptoms']
