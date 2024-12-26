# from django
from django.urls import path

# from views
from doctor_management.views import DoctorAppointmentsView, DoctorProfileView, AppointmentManagementView

urlpatterns = [
    path('profile/<int:pk>/', DoctorProfileView.as_view(), name='doctor_profile'),
    path('appointments/', DoctorAppointmentsView.as_view(), name='doctor_appointments'),
    path('appointments/manage/', AppointmentManagementView.as_view(), name='appointment_management'),
    path('appointments/manage/<int:pk>/', AppointmentManagementView.as_view(), name='appointment_update'),
]