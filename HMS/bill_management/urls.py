# from django
from django.urls import path

# from views
from bill_management.views import SalaryListCreateView, SalaryDetailView, InvoiceListCreateView, InvoiceDetailView

urlpatterns = [
    path('salaries/', SalaryListCreateView.as_view(), name='salary_list_create'),
    path('salaries/<int:pk>/', SalaryDetailView.as_view(), name='salary_detail'),
    path('invoices/', InvoiceListCreateView.as_view(), name='invoice_list_create'),
    path('invoices/<int:pk>/', InvoiceDetailView.as_view(), name='invoice_detail'),
]