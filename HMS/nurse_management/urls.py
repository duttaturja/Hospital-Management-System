from django.urls import path
from .views import NursePatientUpdateView, NurseRoomAssignmentView

urlpatterns = [
    path('profile/<int:pk>/', NursePatientUpdateView.as_view(), name='nurse_profile'),
    path('patient-updates/', NursePatientUpdateView.as_view(), name='nurse_patient_update'),
    path('room-assignments/', NurseRoomAssignmentView.as_view(), name='nurse_room_assignment'),
]
