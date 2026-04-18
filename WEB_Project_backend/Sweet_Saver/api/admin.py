from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import Product, CartItem

admin.site.register(Product)
admin.site.register(CartItem)

admin.site.unregister(User)   # remove default
admin.site.register(User, UserAdmin)  # re-register with control