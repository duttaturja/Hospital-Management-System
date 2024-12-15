#from django
from django.urls import path

# from views
from user_management.views import UserRegisterView, UserLoginView, UserLogoutView, UserDetailsView, AdminUserRegisterView, AdminUserLoginView, AdminUserLogoutView, AdminUserDetailsView

urlpatterns = [
    #user urls
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('logout/', UserLogoutView.as_view(), name='user-logout'),
    path('details/', UserDetailsView.as_view(), name='user-details'),
    #admin urls
    path('admin/register/', AdminUserRegisterView.as_view(), name='admin-user-register'),
    path('admin/login/', AdminUserLoginView.as_view(), name='admin-user-login'),
    path('admin/logout/', AdminUserLogoutView.as_view(), name='admin-user-logout'),
    path('admin/details/', AdminUserDetailsView.as_view(), name='admin-user-details'),
]