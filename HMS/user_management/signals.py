from django.db.models.signals import post_save
from django.dispatch import receiver
# from .models import User
from patient_management.models import PatientProfile
from doctor_management.models import DoctorProfile
from staff_management.models import StaffProfile
from nurse_management.models import NurseProfile
from django.contrib.auth import get_user_model

User = get_user_model()

@receiver(post_save, sender=User)
def create_role_profile(sender, instance, created, **kwargs):
    if created:
        if instance.role == 'Patient':
            PatientProfile.objects.create(user=instance)
            print("Patient profile created")
        if instance.role == 'Doctor':
            DoctorProfile.objects.create(user=instance)
            print("Doctor profile created")
        if instance.role == 'Staff':
            StaffProfile.objects.create(user=instance)
            print("Staff profile created")
        if instance.role == 'Nurse':
            NurseProfile.objects.create(user=instance)
            print("Nurse profile created")
        # Add logic for other roles if needed
