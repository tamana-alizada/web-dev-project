from rest_framework import serializers
from .models import Category, Shop, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'icon']


class ProductSerializer(serializers.ModelSerializer):
    shop_name = serializers.CharField(source='shop.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'shop', 'shop_name', 'category', 'category_name',
            'title', 'description', 'price', 'old_price', 'stock',
            'image_url', 'is_available', 'pickup_start', 'pickup_end', 'created_at'
        ]


class ShopSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        fields = ['id', 'owner', 'name', 'description', 'address', 'phone', 'image_url', 'products']
        read_only_fields = ['owner']