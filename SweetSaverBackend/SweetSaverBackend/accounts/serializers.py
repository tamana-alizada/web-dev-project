from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'password', 'role',
            'phone', 'address', 'full_name', 'city', 'bio', 'profile_image'
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'role',
            'phone', 'address', 'full_name', 'city', 'bio', 'profile_image'
        ]
        read_only_fields = ['id', 'username', 'email', 'role']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get('request')

        if instance.profile_image:
            if request:
                data['profile_image'] = request.build_absolute_uri(instance.profile_image.url)
            else:
                data['profile_image'] = instance.profile_image.url

        return data