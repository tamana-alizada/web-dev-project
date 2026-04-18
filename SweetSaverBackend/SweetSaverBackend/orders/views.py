from decimal import Decimal
from django.shortcuts import get_object_or_404
from django.db.models import Prefetch
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from cart.models import Cart
from .models import Order, OrderItem
from .serializers import OrderSerializer


class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart = get_object_or_404(Cart, user=request.user)
        cart_items = cart.items.select_related('product').all()

        if not cart_items.exists():
            return Response(
                {'error': 'Cart is empty.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        order = Order.objects.create(
            user=request.user,
            status='pending',
            total=Decimal('0.00')
        )

        total = Decimal('0.00')

        for item in cart_items:
            product = item.product

            OrderItem.objects.create(
                order=order,
                product=product,
                title=product.title,
                price=product.price,
                quantity=item.quantity
            )

            total += product.price * item.quantity

        order.total = total
        order.save()

        cart_items.delete()

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class UserOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).prefetch_related('items').order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class OwnerOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(
            items__product__shop__owner=request.user
        ).distinct().prefetch_related('items__product__shop').order_by('-created_at')

        result = []

        for order in orders:
            owner_items = [
                item for item in order.items.all()
                if item.product and item.product.shop.owner == request.user
            ]

            owner_total = sum(item.price * item.quantity for item in owner_items)

            result.append({
                'id': order.id,
                'status': order.status,
                'total': owner_total,
                'created_at': order.created_at,
                'items': [
                    {
                        'id': item.id,
                        'title': item.title,
                        'price': item.price,
                        'quantity': item.quantity,
                        'subtotal': item.subtotal,
                        'shop_name': item.product.shop.name if item.product else ''
                    }
                    for item in owner_items
                ]
            })

        return Response(result)