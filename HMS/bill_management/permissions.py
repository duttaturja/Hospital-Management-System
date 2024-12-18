from rest_framework.permissions import BasePermission

class IsAdminOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.role in ['Admin']
    
class IsEmployeeOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role in ['Doctor', 'Nurse', 'Staff', 'Admin']
    
class IsPatientOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.role in ['Patient']