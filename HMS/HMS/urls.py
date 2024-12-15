"""
URL configuration for HMS project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

# from drf spectecular / swagger api documentation
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    #admin urls
    path('admin/', admin.site.urls),

    #swagger api documentation urls
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    #local apps api urls
    path('api/user/', include('user_management.urls')),
    # path('api/rooms/', include('rooms_management.urls')),
    # path('api/patient/', include('patient_management.urls')),
    # path('api/doctor/', include('doctor_management.urls')),
    # path('api/nurse/', include('nurse_management.urls')),
    # path('api/bill/', include('bill_management.urls')),
    # path('api/records/', include('records_management.urls')),
]
