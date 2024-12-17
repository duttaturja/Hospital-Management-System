from django_filters import rest_framework as filters
from .models import PatientRecord

class PatientRecordFilter(filters.FilterSet):
    admission_date = filters.DateFromToRangeFilter()
    discharge_date = filters.DateFromToRangeFilter()
    doctor = filters.CharFilter(field_name='doctor__user__username', lookup_expr='icontains')
    room_number = filters.CharFilter(field_name='room__room_number', lookup_expr='iexact')

    class Meta:
        model = PatientRecord
        fields = ['doctor', 'admission_date', 'discharge_date', 'room_number']