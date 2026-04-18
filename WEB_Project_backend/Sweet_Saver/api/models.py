from django.db import models
from django.conf import settings

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    shop = models.IntegerField()
    shop_name = models.CharField(max_length=100)
    category = models.IntegerField()
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.IntegerField()
    image = models.CharField(max_length=100)
    is_available = models.BooleanField()
    created_at = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    
    
class CartItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart_items'  )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ('product', 'user')

    def __str__(self):
        return f'{self.user.username} - {self.product.title}'


# Create your models here.
