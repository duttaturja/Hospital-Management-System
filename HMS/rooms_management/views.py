from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Room, RoomBooking
from .serializers import RoomSerializer, RoomBookingSerializer

class RoomView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)

    def post(self, request):
        if request.user.role not in ['Admin', 'Staff']:
            return Response({'error': 'Only admins or staff can add rooms.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RoomBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role not in ['Admin', 'Staff', 'Nurse']:
            return Response({'error': 'Only admins, staff, or nurses can view bookings.'}, status=status.HTTP_403_FORBIDDEN)
        bookings = RoomBooking.objects.filter(active=True)
        serializer = RoomBookingSerializer(bookings, many=True)
        return Response(serializer.data)

    def post(self, request):
        if request.user.role not in ['Admin', 'Staff', 'Nurse']:
            return Response({'error': 'Only admins, staff, or nurses can book rooms.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = RoomBookingSerializer(data=request.data)
        if serializer.is_valid():
            room = serializer.validated_data['room']
            if room.is_occupied:
                return Response({'error': 'This room is already occupied.'}, status=status.HTTP_400_BAD_REQUEST)
            room.is_occupied = True
            room.save()
            serializer.save(booked_by=request.user.username)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            booking = RoomBooking.objects.get(pk=pk, active=True)
        except RoomBooking.DoesNotExist:
            return Response({'error': 'Booking not found.'}, status=status.HTTP_404_NOT_FOUND)

        if request.user.role not in ['Admin', 'Staff', 'Nurse']:
            return Response({'error': 'Only admins, staff, or nurses can update bookings.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = RoomBookingSerializer(booking, data=request.data, partial=True)
        if serializer.is_valid():
            if 'active' in serializer.validated_data and not serializer.validated_data['active']:
                booking.room.is_occupied = False
                booking.room.save()
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
