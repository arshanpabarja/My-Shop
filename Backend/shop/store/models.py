from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Product(models.Model):
    title = models.CharField(max_length=100, blank=False, null=False)
    text = models.TextField(max_length=300, blank=True, null=True)
    image = models.CharField(max_length=400, blank=False, null=False)
    price = models.PositiveIntegerField()
    producer = models.CharField(max_length=50, blank=False, null=False)
    special = models.BooleanField()
    discount = models.PositiveBigIntegerField(blank=False , null=True)

    def __str__(self):
        return self.title

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    totalPrice = models.PositiveBigIntegerField(blank=True, null=True, default=0)

    def __str__(self):
        return f'For {self.user.get_username()}'

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'Cart of {self.cart.user.get_username()}'