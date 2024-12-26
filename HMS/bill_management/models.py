# from django
from django.db import models

# from local apps models
from user_management.models import User
from doctor_management.models import DoctorProfile
from nurse_management.models import NurseProfile
from staff_management.models import StaffProfile
from patient_management.models import PatientProfile

class Salary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='salaries')
    amount = models.DecimalField(max_digits=10, decimal_places=2,blank=True, null=True)
    payment_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=50, choices=[
        ('Paid', 'Paid'),
        ('Pending', 'Pending')
    ], default='Pending')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if hasattr(self.user, 'doctorprofile'):
            self.user.doctorprofile.salary = self.amount
            self.user.doctorprofile.save()
        elif hasattr(self.user, 'nurseprofile'):
            self.user.nurseprofile.salary = self.amount
            self.user.nurseprofile.save()
        elif hasattr(self.user, 'staffprofile'):
            self.user.staffprofile.salary = self.amount
            self.user.staffprofile.save()

    def __str__(self):
        return f"Salary for {self.user.full_name} - {self.status}"

class Invoice(models.Model):
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='invoices')
    issued_date = models.DateField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2,blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Invoice for {self.patient.user.full_name} on {self.issued_date}"

