from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer, LoginSerializer, LoginJWTSerializer
from drf_spectacular.utils import extend_schema
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import redirect
from django.http import HttpResponseRedirect
import requests

class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        summary="Register a new user",
        description="Allows users to register with a username, email, password, and role."
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
    

    # @extend_schema(
    #     summary="User login",
    #     description="Allows users to log in with their username and password."
    # )
class UserLoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        summary="User  Login",
        description="Allows users to log in with their username and password."
    )
    # def post(self, request, *args, **kwargs):
    #     username = request.data.get('username')
    #     password = request.data.get('password')

    #     user = authenticate(username=username, password=password)
    #     if user is None:
    #         return Response({"non_field_errors": ["Invalid credentials"]}, status=status.HTTP_401_UNAUTHORIZED)

    #     # Generate tokens
    #     refresh = RefreshToken.for_user(user)
    #     access = str(refresh.access_token)

    #     return Response({
    #         "message": "Login successful",
    #         "user": user.username,
    #         "access": access,
    #         "refresh": str(refresh)
    #     }, status=status.HTTP_200_OK)
    # @extend_schema(
    #     summary="User  login",
    #     description="Allows users to log in with their username and password."
    # )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        # refresh = RefreshToken.for_user(user)
        # access = refresh.access_token

        # response_data = {
        #     "access": str(access),
        #     "refresh": str(refresh)
        # }
        return Response({"message": "Login successful", "user": user.username}, status=status.HTTP_200_OK)

class UserLoginJWTView(generics.GenericAPIView):
    serializer_class = LoginJWTSerializer
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        summary="User  login",
        description="Allows users to log in with their username and password."
    )
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            user_serializer = UserSerializer(user)
            access = str(refresh.access_token)
            redirect_url = 'http://localhost:8000/api/user/login/'
            if user.role == "Patient":
                redirect_url = 'http://localhost:8000/api/patient/profile/'
            elif user.role == "Doctor":
                redirect_url = 'http://localhost:8000/api/doctor/profile/'
            elif user.role == "Staff":
                redirect_url = 'http://localhost:8000/api/staff/profile/'
            elif user.role == "Nurse":
                redirect_url = 'http://localhost:8000/api/nurse/profile/'
            
            headers = {
                'Authorization': f'Bearer {access}'
            }
            try:
                response = requests.post(redirect_url, headers=headers, data={'token': access})
                # if response.status_code == 301:
                #     return HttpResponseRedirect(redirect_url)
                # else:
                #     return Response({'error': 'Failed to redirect'}, status=response.status_code)
                return Response({'message': 'Login successful', 'user': user_serializer.data, 'access': access, 'refresh': str(refresh), 'response': response.json()}, status=status.HTTP_200_OK)
            except requests.exceptions.RequestException as e:
                return Response({'error': str(e)}, status=500)
        else:
            return Response({"non_field_errors": ["Invalid credentials"]}, status=status.HTTP_401_UNAUTHORIZED)
        

class UserLogoutView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        summary="User logout",
        description="Logs out the user."
    )
    def post(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)