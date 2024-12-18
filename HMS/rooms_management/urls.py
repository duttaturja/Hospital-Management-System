from django.urls import path
from .views import RoomView, RoomBookingView

urlpatterns = [
    path('rooms/', RoomView.as_view(), name='room_list'),
    path('rooms/bookings/', RoomBookingView.as_view(), name='room_booking_management'),
]
