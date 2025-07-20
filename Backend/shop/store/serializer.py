from rest_framework import serializers
from .models import Product, Cart, CartItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'text', 'price', 'image', 'producer', 'special','discount']


class CartItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartItem
        fields = [ 'product', 'qty']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = [ 'user', 'totalPrice', 'items']
