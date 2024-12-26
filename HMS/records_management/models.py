# from django
from django.db import models

# from local apps
from user_management.models import User
from doctor_management.models import DoctorProfile
from rooms_management.models import Room
from patient_management.models import PatientProfile


class PatientRecord(models.Model):
    patient = models.OneToOneField(PatientProfile, on_delete=models.CASCADE, related_name='records')
    admission_date = models.DateField()
    discharge_date = models.DateField(null=True, blank=True)
    diagnosis = models.TextField()
    treatment = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_records')
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.SET_NULL, null=True, related_name='doctor_records')
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, related_name='room_records')
    timestamp = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return f"Record for {self.patient} created by {self.created_by} at {self.timestamp}"
