from django.db import models
from user_management.models import User
from patient_management.models import PatientProfile  
from rooms_management.models import Room
from doctor_management.models import DoctorProfile  

class NursePatientUpdate(models.Model):
    nurse = models.ForeignKey(User, on_delete=models.CASCADE, related_name='nurse_patient_updates')
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='nurse_updates')  # Changed from Patient to PatientProfile
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE, related_name='nurse_to_doctor_updates')  # Changed from Doctor to DoctorProfile
    update_text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Update by Nurse {self.nurse.username} for {self.patient}"

class NurseRoomAssignment(models.Model):
    nurse = models.ForeignKey(User, on_delete=models.CASCADE, related_name='nurse_room_assignments')
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='nurse_assigned_rooms')
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='nurse_room_updates')  # Changed from Patient to PatientProfile
    assigned_date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Nurse {self.nurse.username} assigned to Room {self.room.room_id} for {self.patient}"
