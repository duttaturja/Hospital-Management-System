from django.urls import path
from .views import PatientRecordListCreateView, PatientRecordRetrieveUpdateDestroyView, PatientRecordView

urlpatterns = [
    path('all-records/', PatientRecordListCreateView.as_view(), name='patient_records_list_create'),
    path('records/<int:pk>/', PatientRecordRetrieveUpdateDestroyView.as_view(), name='patient_record_detail'),
     path('records/', PatientRecordView.as_view(), name='patient_records'),
]