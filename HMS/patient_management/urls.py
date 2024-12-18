from django.urls import path
from .views import PatientProfileView, AdmissionManagementView, AppointmentBookingView

urlpatterns = [
    path('patient/profile/', PatientProfileView.as_view(), name='patient_profile'),  # Patient-specific profile endpoint
    path('patient/admissions/', AdmissionManagementView.as_view(), name='patient_admissions'),  # Patient-specific admissions
    path('patient/appointments/', AppointmentBookingView.as_view(), name='patient_appointments'),  # Patient-specific appointments
]
