from django.urls import path
from .views import CartView, CartItemDeleteView

urlpatterns = [
    path('', CartView.as_view(), name='cart'),
    path('items/<int:item_id>/', CartItemDeleteView.as_view(), name='cart-item-delete'),
]