
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user is None:
            raise serializers.ValidationError("Invalid credentials")
        
        # refresh = RefreshToken.for_user(user)
        # access = str(refresh.access_token)

        # response_data = {
        #     'access': str(access),
        #     'refresh': str(refresh),
        # }
        return user
    
class LoginJWTSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()