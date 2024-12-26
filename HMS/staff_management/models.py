# from django
from django.db import models

# from user models
# from user_management.models import User

from django.contrib.auth import get_user_model

User = get_user_model()

class StaffProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='staff_profile')
    department = models.CharField(max_length=100,blank=True, null=True)
    job_title = models.CharField(max_length=100,blank=True, null=True)
    experience_years = models.PositiveIntegerField(blank=True, null=True)
    contact_number = models.CharField(max_length=15,blank=True, null=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2,blank=True, null=True)



class Task(models.Model):
    staff = models.ForeignKey(StaffProfile, on_delete=models.CASCADE, related_name='tasks')
    task_name = models.CharField(max_length=255,blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    assigned_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='assigned_tasks')
    assigned_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=[
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed')
    ], default='Pending')

    def __str__(self):
        return f"{self.task_name} - {self.status}"
