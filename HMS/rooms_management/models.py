from django.db import models
from patient_management.models import PatientProfile

class Room(models.Model):
    room_number = models.CharField(max_length=10, unique=True)
    room_type = models.CharField(max_length=50, choices=[('General', 'General'), ('Private', 'Private'), ('ICU', 'ICU')])
    is_occupied = models.BooleanField(default=False)

    def __str__(self):
        return f"Room {self.room_number} ({self.room_type})"

class RoomBooking(models.Model):
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='room_bookings')
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='bookings')
    booked_from = models.DateTimeField()
    booked_until = models.DateTimeField()
    booked_by = models.CharField(max_length=100)  # To track who booked the room (staff/admin)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"Booking for {self.patient} in Room {self.room.room_number}"
