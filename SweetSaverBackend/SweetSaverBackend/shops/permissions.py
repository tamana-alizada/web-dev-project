from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user and request.user.is_staff:
            return True

        if request.method in SAFE_METHODS:
            return True

        if hasattr(obj, 'owner'):
            return obj.owner == request.user

        if hasattr(obj, 'shop'):
            return obj.shop.owner == request.user

        return False