# from rest framework
from rest_framework import serializers

#from models
from records_management.models import PatientRecord

# from local apps
from user_management.models import User
from doctor_management.models import DoctorProfile
from rooms_management.models import Room
# from patient_management.models import PatientProfile


class PatientRecordSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.user.username', read_only=True)
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    doctor_name = serializers.CharField(source='doctor.user.username', read_only=True)
    room = serializers.CharField(source='room.room_number', read_only=True)

    class Meta:
        model = PatientRecord
        fields = ['id', 'patient', 'patient_name', 'created_by', 'created_by_name', 'admission_date', 
                  'discharge_date', 'diagnosis', 'treatment', 'doctor', 'doctor_name', 'room', 'room_number']
        read_only_fields = ['created_by']

    # def validate_patient(self, value):
    #     if not PatientProfile.objects.filter(id=value.id).exists():
    #         raise serializers.ValidationError("Invalid patient provided.")
    #     return value

    def validate_diagnosis(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Diagnosis must be at least 3 characters long.")
        return value

    def validate_doctor(self, value):
        if not DoctorProfile.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Invalid doctor provided.")
        return value

    def validate_room(self, value):
        if not Room.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Invalid room provided.")
        return value

    def validate(self, attrs):
        if attrs.get('admission_date') and attrs.get('discharge_date'):
            if attrs['admission_date'] > attrs['discharge_date']:
                raise serializers.ValidationError("Discharge date cannot be earlier than admission date.")
        return attrs

