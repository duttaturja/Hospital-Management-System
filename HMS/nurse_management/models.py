from django.db import models
# from user_management.models import User
from patient_management.models import PatientProfile  
from rooms_management.models import Room
from doctor_management.models import DoctorProfile
from django.contrib.auth import get_user_model

User = get_user_model()

class NurseProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='nurse_profile')
    department = models.CharField(max_length=100,blank=True, null=True)
    experience_years = models.PositiveIntegerField(blank=True, null=True)
    contact_number = models.CharField(max_length=15,blank=True, null=True)


class NursePatientUpdate(models.Model):
    nurse = models.ForeignKey(User, on_delete=models.CASCADE, related_name='nurse_patient_updates')
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='nurse_updates')  # Changed from PatientProfile
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE, related_name='nurse_to_doctor_updates')  # Changed from DoctorProfile
    update_text = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Update by Nurse {self.nurse.username} for {self.patient}"

class NurseRoomAssignment(models.Model):
    nurse = models.ForeignKey(User, on_delete=models.CASCADE, related_name='nurse_room_assignments')
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='nurse_assigned_rooms')
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='nurse_room_updates')  # Changed from PatientProfile
    assigned_date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True,blank=True, null=True)

    def __str__(self):
        return f"Nurse {self.nurse.username} assigned to Room {self.room.room_id} for {self.patient}"
