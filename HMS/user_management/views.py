from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer, LoginSerializer, LoginJWTSerializer
from drf_spectacular.utils import extend_schema
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

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
        summary="User Login",
        description="Allows users to log in with their username and password."
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({"message": "Login successful", "user": user.username}, status=status.HTTP_200_OK)

class UserLoginJWTView(generics.GenericAPIView):
    serializer_class = LoginJWTSerializer
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        summary="User Login (JWT)",
        description="Allows users to log in and receive JWT access/refresh tokens."
    )
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # 1. Authenticate User
        user = authenticate(username=username, password=password)
        
        if user is not None:
            # 2. Generate Tokens
            refresh = RefreshToken.for_user(user)
            user_serializer = UserSerializer(user)
            
            # 3. Return tokens and user info directly
            # We removed the complex internal request logic here because it was causing 404/500 errors.
            return Response({
                'message': 'Login successful', 
                'user': user_serializer.data, 
                'access': str(refresh.access_token), 
                'refresh': str(refresh)
            }, status=status.HTTP_200_OK)
        else:
            return Response({"non_field_errors": ["Invalid credentials"]}, status=status.HTTP_401_UNAUTHORIZED)

class UserLogoutView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        summary="User logout",
        description="Logs out the user."
    )
    def post(self, request, *args, **kwargs):
        # SimpleJWT is stateless, so we can't strictly "logout" on the server without a blacklist.
        # But this endpoint serves as a signal for the frontend to clear storage.
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)