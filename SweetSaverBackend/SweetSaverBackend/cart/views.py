from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404

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

    def post(self, request):
        cart = self.get_cart(request.user)
        serializer = AddCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = get_object_or_404(Product, id=serializer.validated_data['product_id'])
        quantity = serializer.validated_data['quantity']

        item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if created:
            item.quantity = quantity
        else:
            item.quantity += quantity
        item.save()

        return Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED)


class CartItemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, item_id):
        cart = get_object_or_404(Cart, user=request.user)
        item = get_object_or_404(CartItem, id=item_id, cart=cart)

        serializer = UpdateCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        item.quantity = serializer.validated_data['quantity']
        item.save()

        return Response({
            'message': 'Cart item updated successfully',
            'item_id': item.id,
            'quantity': item.quantity,
            'subtotal': item.subtotal
        }, status=status.HTTP_200_OK)

    def delete(self, request, item_id):
        cart = get_object_or_404(Cart, user=request.user)
        item = get_object_or_404(CartItem, id=item_id, cart=cart)
        item.delete()
        return Response({'message': 'Item removed from cart'}, status=status.HTTP_204_NO_CONTENT)