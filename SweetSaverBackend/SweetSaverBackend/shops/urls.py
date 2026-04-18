from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet,
    ShopViewSet,
    ProductViewSet,
    featured_products,
    OwnerShopListView,
    OwnerProductListCreateView,
    OwnerProductDetailView
)

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='categories')
router.register('shops', ShopViewSet, basename='shops')
router.register('products', ProductViewSet, basename='products')

urlpatterns = [
    path('products/featured/', featured_products, name='featured-products'),

    path('owner/shops/', OwnerShopListView.as_view(), name='owner-shops'),
    path('owner/products/', OwnerProductListCreateView.as_view(), name='owner-products'),
    path('owner/products/<int:pk>/', OwnerProductDetailView.as_view(), name='owner-product-detail'),
]

urlpatterns += router.urls