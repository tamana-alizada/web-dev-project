from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from api import views

urlpatterns = [
    path('signup/', views.SignUpView.as_view()),
    path('signin/', views.SignInView.as_view()),
    path('login/', TokenObtainPairView.as_view()),
    path('cart/', views.CartItemListCreateView.as_view()),
    path('cart/<int:pk>/', views.CartItemDetailView.as_view()),
    path('products/', views.ProductListCreateView.as_view()),
    path('products/<int:product_id>/', views.ProductDetailView.as_view()),
]