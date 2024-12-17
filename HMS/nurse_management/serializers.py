from rest_framework import serializers
from .models import NursePatientUpdate, NurseRoomAssignment, NurseProfile

from rest_framework.exceptions import ValidationError

def validate_salary(value):
    if value < 0:
        raise ValidationError("Salary cannot be negative.")
    
class NursePatientUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NursePatientUpdate
        fields = ['id', 'nurse', 'patient', 'doctor', 'update_text', 'timestamp']

class NurseRoomAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = NurseRoomAssignment
        fields = ['id', 'nurse', 'room', 'patient', 'assigned_date', 'is_active']


class NurseProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    salary = serializers.DecimalField(max_digits=10, decimal_places=2, validators=[validate_salary])
    class Meta:
        model = NurseProfile
        fields = ['user', 'specialization', 'experience', 'fees', 'salary']