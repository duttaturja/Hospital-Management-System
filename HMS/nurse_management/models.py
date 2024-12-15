from django.db import models

# from room models
from rooms_management.models import Room

class Nurse(models.Model):
    nurse_id = models.AutoField(primary_key=True)
    nurse_name = models.CharField(max_length=100)
    phone_no = models.CharField(max_length=15, unique=True)
    address = models.TextField()
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, blank=True)  
    
    def __str__(self):
        return f"{self.nurse_name} (ID: {self.nurse_id})"
    