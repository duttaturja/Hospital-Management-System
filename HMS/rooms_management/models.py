from django.db import models

class Room(models.Model):
    room_id = models.AutoField(primary_key=True)
    room_type = models.CharField(max_length=100)  
    room_charges = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Room {self.room_id} ({self.room_type})"

