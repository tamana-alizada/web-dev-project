from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        if hasattr(obj, 'owner'):
            return obj.owner == request.user

        if hasattr(obj, 'shop'):
            return obj.shop.owner == request.user

        return False