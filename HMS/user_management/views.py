from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer, LoginSerializer
from drf_spectacular.utils import extend_schema

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

class UserLoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        summary="User  login",
        description="Allows users to log in with their username and password."
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({"message": "Login successful", "user": user.username}, status=status.HTTP_200_OK)

class UserLogoutView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        summary="User  logout",
        description="Logs out the user."
    )
    def post(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)