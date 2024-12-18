from rest_framework import serializers
from .models import Room, RoomBooking

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'room_number', 'room_type', 'is_occupied']

class RoomBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomBooking
        fields = ['id', 'patient', 'room', 'booked_from', 'booked_until', 'booked_by', 'active']

    def validate(self, data):
        # Validate booking period
        if data['booked_until'] <= data['booked_from']:
            raise serializers.ValidationError("Booking end time must be after start time.")

        # Check for overlapping bookings
        overlapping_bookings = RoomBooking.objects.filter(
            room=data['room'],
            booked_until__gte=data['booked_from'],
            booked_from__lte=data['booked_until'],
            active=True
        )
        if overlapping_bookings.exists():
            raise serializers.ValidationError("This room is already booked for the selected period.")
        
        return data
