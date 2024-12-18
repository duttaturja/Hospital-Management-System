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

    def validate_assigned_patients(self, nurse):
        if nurse.assigned_patients.count() > 10:
            raise serializers.ValidationError("A nurse cannot be assigned to more than 10 patients.")
        return nurse


class NurseRoomAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = NurseRoomAssignment
        fields = ['id', 'nurse', 'room', 'patient', 'assigned_date', 'is_active']
        
    def validate_assigned_patients(self, nurse):
        if nurse.assigned_patients.count() > 10:
            raise serializers.ValidationError("A nurse cannot be assigned to more than 10 patients.")
        return nurse

class NurseProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    salary = serializers.DecimalField(max_digits=10, decimal_places=2, validators=[validate_salary])
    class Meta:
        model = NurseProfile
        fields = ['user', 'specialization', 'experience', 'fees', 'salary']