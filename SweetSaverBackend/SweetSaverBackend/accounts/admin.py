from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User

    list_display = (
        'id', 'username', 'email', 'role',
        'is_staff', 'is_superuser', 'is_active'
    )
    list_filter = ('role', 'is_staff', 'is_superuser', 'is_active')

    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {
            'fields': (
                'role', 'phone', 'address',
                'full_name', 'city', 'bio', 'profile_image'
            )
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Additional Info', {
            'fields': (
                'email', 'role', 'phone', 'address',
                'full_name', 'city', 'bio', 'profile_image'
            )
        }),
    )

    search_fields = ('username', 'email', 'role')
    ordering = ('id',)