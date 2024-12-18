# from rest framework
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

# from models
from .models import Salary, Invoice

class SalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Salary
        fields = ['id', 'user', 'amount', 'payment_date', 'status']

    def validate_user(self, value):
        if not any([
            hasattr(value, 'doctorprofile'),
            hasattr(value, 'nurseprofile'),
            hasattr(value, 'staffprofile')
        ]):
            raise ValidationError("The selected user does not have a valid profile.")
        return value
    def validate_salary(self, value):
        if value < 10000:
            raise serializers.ValidationError("Salary must be at least 10,000.")
        return value


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = ['id', 'patient', 'issued_date', 'total_amount', 'description']
    
    def validate_invoice_total(self, data):
        total = sum(item.amount for item in data['line_items'])
        if data['total'] != total:
            raise serializers.ValidationError("Invoice total does not match the sum of line items.")
        return data
