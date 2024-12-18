# from django
from django_filters import rest_framework as filters

# from models
from .models import Invoice

class InvoiceFilter(filters.FilterSet):
    patient_name = filters.CharFilter(field_name='patient__user__full_name', lookup_expr='icontains')

    class Meta:
        model = Invoice
        fields = ['patient_name']