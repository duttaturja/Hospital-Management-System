from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import NursePatientUpdate, NurseRoomAssignment
from .serializers import NursePatientUpdateSerializer, NurseRoomAssignmentSerializer

class NursePatientUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'Nurse':
            return Response({'error': 'Only nurses can access this resource.'}, status=status.HTTP_403_FORBIDDEN)
        updates = NursePatientUpdate.objects.filter(nurse=request.user)
        serializer = NursePatientUpdateSerializer(updates, many=True)
        return Response(serializer.data)

    def post(self, request):
        if request.user.role != 'Nurse':
            return Response({'error': 'Only nurses can send updates.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = NursePatientUpdateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(nurse=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NurseRoomAssignmentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'Nurse':
            return Response({'error': 'Only nurses can view room assignments.'}, status=status.HTTP_403_FORBIDDEN)
        assignments = NurseRoomAssignment.objects.filter(nurse=request.user, is_active=True)
        serializer = NurseRoomAssignmentSerializer(assignments, many=True)
        return Response(serializer.data)

    def post(self, request):
        if request.user.role != 'Nurse':
            return Response({'error': 'Only nurses can manage room assignments.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = NurseRoomAssignmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(nurse=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
