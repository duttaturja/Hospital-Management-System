from django.urls import path
from .views import PatientProfileView, AdmissionManagementView, AppointmentBookingView

urlpatterns = [
    path('profile/', PatientProfileView.as_view(), name='patient_profile'),
    path('admissions/', AdmissionManagementView.as_view(), name='admission_management'),
    path('appointments/', AppointmentBookingView.as_view(), name='appointment_booking'),
]
