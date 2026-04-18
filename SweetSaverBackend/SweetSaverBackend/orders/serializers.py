from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    subtotal = serializers.SerializerMethodField()
    shop_name = serializers.CharField(source='product.shop.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'title', 'price', 'quantity', 'subtotal', 'shop_name']

    def get_subtotal(self, obj):
        return obj.subtotal


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'status', 'total', 'created_at', 'items']