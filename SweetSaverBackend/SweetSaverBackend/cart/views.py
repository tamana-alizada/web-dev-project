from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db import transaction

from .models import Cart, CartItem
from .serializers import CartSerializer, AddCartItemSerializer, UpdateCartItemSerializer
from shops.models import Product


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get_cart(self, user):
        cart, _ = Cart.objects.get_or_create(user=user)
        return cart

    def get(self, request):
        cart = self.get_cart(request.user)
        return Response(CartSerializer(cart).data)

    @transaction.atomic
    def post(self, request):
        cart = self.get_cart(request.user)
        serializer = AddCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = get_object_or_404(
            Product.objects.select_for_update(),
            id=serializer.validated_data['product_id']
        )
        quantity = serializer.validated_data['quantity']

        if product.stock < quantity:
            return Response(
                {'error': f'Not enough stock. Only {product.stock} left.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if created:
            item.quantity = quantity
        else:
            # Check if total requested quantity exceeds stock
            if product.stock < quantity:
                return Response(
                    {'error': f'Not enough stock. Only {product.stock} left.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            item.quantity += quantity
        item.save()

        # Decrement product stock
        product.stock -= quantity
        if product.stock == 0:
            product.is_available = False
        product.save()

        return Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED)


class CartItemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def patch(self, request, item_id):
        cart = get_object_or_404(Cart, user=request.user)
        item = get_object_or_404(CartItem, id=item_id, cart=cart)

        serializer = UpdateCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        new_quantity = serializer.validated_data['quantity']
        old_quantity = item.quantity
        diff = new_quantity - old_quantity

        product = Product.objects.select_for_update().get(id=item.product_id)

        if diff > 0:
            # Increasing quantity — need more stock
            if product.stock < diff:
                return Response(
                    {'error': f'Not enough stock. Only {product.stock} left.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            product.stock -= diff
        elif diff < 0:
            # Decreasing quantity — restore stock
            product.stock += abs(diff)

        if product.stock == 0:
            product.is_available = False
        else:
            product.is_available = True
        product.save()

        item.quantity = new_quantity
        item.save()

        return Response({
            'message': 'Cart item updated successfully',
            'item_id': item.id,
            'quantity': item.quantity,
            'subtotal': item.subtotal
        }, status=status.HTTP_200_OK)

    @transaction.atomic
    def delete(self, request, item_id):
        cart = get_object_or_404(Cart, user=request.user)
        item = get_object_or_404(CartItem, id=item_id, cart=cart)

        # Restore stock when removing item from cart
        product = Product.objects.select_for_update().get(id=item.product_id)
        product.stock += item.quantity
        if product.stock > 0:
            product.is_available = True
        product.save()

        item.delete()
        return Response({'message': 'Item removed from cart'}, status=status.HTTP_204_NO_CONTENT)