from django.db import models
from user_management.models import User
from doctor_management.models import DoctorProfile
from room_management.models import Room  

class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient_profile')
    date_of_birth = models.DateField()
    address = models.TextField()
    contact_number = models.CharField(max_length=15)
    emergency_contact = models.CharField(max_length=15)
    medical_history = models.TextField(blank=True, null=True)
    assigned_doctor = models.ForeignKey(DoctorProfile, on_delete=models.SET_NULL, null=True, blank=True, related_name='patients')

class Admission(models.Model):
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='admissions')
    admission_date = models.DateTimeField(auto_now_add=True)
    discharge_date = models.DateTimeField(blank=True, null=True)
    reason = models.TextField()
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, blank=True, related_name='admissions')

class AppointmentBooking(models.Model):
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE, related_name='booked_appointments')
    appointment_date = models.DateTimeField()
    symptoms = models.TextField()
