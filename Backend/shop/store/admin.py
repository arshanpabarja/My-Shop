from django.contrib import admin
from .models import *

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["id","title"]
    def get_readonly_fields(self, request, obj = None):
        if obj and not obj.special:
            return['discount']
        return []
        

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['id', 'user']

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['qty', 'product', 'cart']