from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ShopViewSet, ProductViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='categories')
router.register('shops', ShopViewSet, basename='shops')
router.register('products', ProductViewSet, basename='products')

urlpatterns = router.urls