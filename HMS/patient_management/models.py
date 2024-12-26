from django.db import models
# from user_management.models import User
from doctor_management.models import DoctorProfile
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.contrib.auth import get_user_model

User = get_user_model()

# Use string notation to avoid circular imports for models from other apps
class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient_profile')
    date_of_birth = models.DateField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    contact_number = models.CharField(max_length=15,blank=True, null=True)
    emergency_contact = models.CharField(max_length=15,blank=True, null=True)
    medical_history = models.TextField(blank=True, null=True)
    assigned_doctor = models.ForeignKey(DoctorProfile, on_delete=models.SET_NULL, null=True, blank=True, related_name='patients')

class Admission(models.Model):
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='admissions')
    admission_date = models.DateTimeField(auto_now_add=True)
    discharge_date = models.DateTimeField(blank=True, null=True)
    reason = models.TextField(blank=True, null=True)

    # Use string notation to avoid circular imports
    room = models.ForeignKey('rooms_management.Room', on_delete=models.SET_NULL, null=True, blank=True, related_name='admissions')

class AppointmentBooking(models.Model):
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE, related_name='booked_appointments')
    appointment_date = models.DateTimeField(blank=True, null=True)
    symptoms = models.TextField(blank=True, null=True)


# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     """Create a Profile instance whenever a new User is created."""
#     if created:
#         PatientProfile.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     """Ensure the Profile is saved whenever the User is saved."""
#     instance.PatientProfile.save()
