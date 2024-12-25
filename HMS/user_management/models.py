# accounts/models.py

from django.contrib.auth.models import AbstractUser 
from django.db import models

class User(AbstractUser ):
    ROLE_CHOICES = [
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
        ('staff', 'Staff'),
        ('admin', 'Admin'),
        ('nurse', 'Nurse'),
    ]
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    def __str__(self):
        return self.username