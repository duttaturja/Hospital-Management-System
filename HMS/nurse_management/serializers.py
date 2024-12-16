from rest_framework import serializers
from .models import NursePatientUpdate, NurseRoomAssignment

class NursePatientUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NursePatientUpdate
        fields = ['id', 'nurse', 'patient', 'doctor', 'update_text', 'timestamp']

class NurseRoomAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = NurseRoomAssignment
        fields = ['id', 'nurse', 'room', 'patient', 'assigned_date', 'is_active']
