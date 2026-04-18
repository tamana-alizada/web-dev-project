from django.urls import path
from .views import CreateOrderView, UserOrdersView, OwnerOrdersView

urlpatterns = [
    path('create/', CreateOrderView.as_view(), name='create-order'),
    path('', UserOrdersView.as_view(), name='user-orders'),
    path('owner/', OwnerOrdersView.as_view(), name='owner-orders'),
]