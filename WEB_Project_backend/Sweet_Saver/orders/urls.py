from django.urls import path
from .views import CreateOrderView, UserOrdersView

urlpatterns = [
    path('create/', CreateOrderView.as_view(), name='create-order'),
    path('', UserOrdersView.as_view(), name='user-orders'),
]