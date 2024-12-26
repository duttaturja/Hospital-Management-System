from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User
from patient_management.models import PatientProfile
from doctor_management.models import DoctorProfile
from staff_management.models import StaffProfile
from nurse_management.models import NurseProfile

@receiver(post_save, sender=User)
def create_role_profile(sender, instance, created, **kwargs):
    if created:
        if instance.role == 'Patient':
            PatientProfile.objects.create(user=instance)
        if instance.role == 'Doctor':
            DoctorProfile.objects.create(user=instance)
        if instance.role == 'Staff':
            StaffProfile.objects.create(user=instance)
        if instance.role == 'Nurse':
            NurseProfile.objects.create(user=instance)
        # Add logic for other roles if needed
