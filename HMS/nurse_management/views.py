from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import NursePatientUpdate, NurseRoomAssignment, NurseProfile
from .serializers import NursePatientUpdateSerializer, NurseRoomAssignmentSerializer, NurseProfileSerializer

# from permissions
from user_management.permissions import  IsNurse

class NurseProfileView(APIView):
    permission_classes = [IsAuthenticated, IsNurse]

    def get(self, request):
        try:
            nurse_profile = NurseProfile.objects.get(user=request.user)
            serializer = NurseProfileSerializer(nurse_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except NurseProfile.DoesNotExist:
            return Response({"error": "Nurse profile not found"}, status=status.HTTP_404_NOT_FOUND)
        
    def patch(self, request):
        try:
            nurse_profile = NurseProfile.objects.get(user=request.user)
            serializer = NurseProfileSerializer(nurse_profile, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except NurseProfile.DoesNotExist:
            return Response({"error": "Nurse profile not found"}, status=status.HTTP_404_NOT_FOUND) 

class NursePatientUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsNurse]

    def get(self, request):
        updates = NursePatientUpdate.objects.filter(nurse=request.user)
        serializer = NursePatientUpdateSerializer(updates, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NursePatientUpdateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(nurse=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NurseRoomAssignmentView(APIView):
    permission_classes = [IsAuthenticated, IsNurse]

    def get(self, request):
        assignments = NurseRoomAssignment.objects.filter(nurse=request.user, is_active=True)
        serializer = NurseRoomAssignmentSerializer(assignments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NurseRoomAssignmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(nurse=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
