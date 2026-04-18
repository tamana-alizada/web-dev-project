from rest_framework import viewsets, permissions, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.db.models import Prefetch

from .models import Category, Shop, Product
from .serializers import CategorySerializer, ShopSerializer, ProductSerializer
from .permissions import IsOwnerOrAdmin


@api_view(['GET'])
@permission_classes([AllowAny])
def featured_products(request):
    products = Product.objects.filter(
        is_available=True,
        stock__gt=0
    ).select_related('shop', 'category').order_by('-created_at')[:3]

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all().prefetch_related('products')
    serializer_class = ShopSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), IsOwnerOrAdmin()]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('shop', 'category').all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), IsOwnerOrAdmin()]


# OWNER ONLY VIEWS

class OwnerShopListView(generics.ListAPIView):
    serializer_class = ShopSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Shop.objects.filter(owner=self.request.user).prefetch_related('products')


class OwnerProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Product.objects.select_related('shop', 'category').filter(shop__owner=self.request.user)

    def perform_create(self, serializer):
        shop = serializer.validated_data['shop']
        if shop.owner != self.request.user:
            raise permissions.PermissionDenied("You can only add products to your own shop.")
        serializer.save()


class OwnerProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        return Product.objects.select_related('shop', 'category').filter(shop__owner=self.request.user)