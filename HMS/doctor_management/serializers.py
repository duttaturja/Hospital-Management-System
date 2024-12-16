# from django
from django.core.exceptions import ValidationError
from datetime import time, date, datetime

# from rest framework
from rest_framework import serializers

# from models
from .models import DoctorProfile, Appointment
from user_management.models import User

 # validations
def validate_experience(value):
    if value < 0:
        raise ValidationError("Experience cannot be negative.")
    if value > 50:
        raise ValidationError("Experience cannot be greater than 50.")
    
def validate_fees(value):
    if value < 0:
        raise ValidationError("Fees cannot be negative.")
    if value > 2000:
        raise ValidationError("Fees cannot be greater than 2000.")
    
def validate_salary(value):
    if value < 0:
        raise ValidationError("Salary cannot be negative.")
    
def validate_specialization(value):
    if len(value) < 3:
        raise ValidationError("Specialization must be at least 3 characters long.")

def validate_appointment_time(value):
    if value <= datetime.now().time():
        raise ValidationError("Appointment time cannot be in the past.")
    
def validate_appointment_date(value):
    if value < date.today():
        raise ValidationError("Appointment date cannot be in the past.")
    

class DoctorProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    experience = serializers.IntegerField(validators=[validate_experience])
    fees = serializers.DecimalField(max_digits=5, decimal_places=2, validators=[validate_fees])
    salary = serializers.DecimalField(max_digits=10, decimal_places=2, validators=[validate_salary])

    class Meta:
        model = DoctorProfile
        fields = ['user', 'specialization', 'experience', 'fees', 'salary']

    def validate_specialization(self, value):
        if len(value) < 3:
            raise ValidationError("Specialization must be at least 3 characters long.")
        return value
    
class AppointmentSerializer(serializers.Serializer):
    
    class Meta:
        model = Appointment
        fields = ['patient', 'doctor', 'date', 'time', 'reson', 'status', 'prescription']
        
