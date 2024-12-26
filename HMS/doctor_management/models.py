# from django
from django.db import models

# from user models
from django.contrib.auth import get_user_model

User = get_user_model()

class DoctorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor_profile')
    specialization = models.CharField(max_length=100,blank=True, null=True)
    experience = models.PositiveIntegerField(blank=True, null=True)
    fees = models.DecimalField(max_digits=5, decimal_places=2,blank=True, null=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2,blank=True, null=True)
    

class Appointment(models.Model):
    status_choices = [
        ('Scheduled', 'Scheduled'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments_as_doctor')
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    reason = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=status_choices, default='Scheduled')
    prescription = models.TextField(null=True, blank=True)


    