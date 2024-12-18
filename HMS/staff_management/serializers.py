# from rest framework
from rest_framework import serializers

# from models
from staff_management.models import StaffProfile, Task

class StaffProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffProfile
        fields = ['id', 'user', 'department', 'job_title', 'experience_years', 'contact_number', 'salary']

        def validate_salary(self, value):
            if value < 0 or value > 1_000_000:
                raise serializers.ValidationError("Salary must be between 0 and 1,000,000.")
            return value

        def validate_contact_number(self, value):
            if len(value) < 10 or len(value) > 15:
                raise serializers.ValidationError("Contact number must be between 10 and 15 characters.")
            return value

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'staff', 'task_name', 'description', 'assigned_by', 'assigned_at', 'completed_at', 'status']
