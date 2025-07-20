from django.urls import path
from .views import *
urlpatterns = [
    path('products/', Products.as_view()),
    path('authenticate/', Authenticate.as_view()),
    path('password/', Password.as_view()),
    path('user/', userInfo.as_view()),
    path('products/<int:pk>', ProductDeatil.as_view()),
    path('cart/', CartItems.as_view()),
    path('cart/delete/<int:pk>', DeleteItem.as_view()),
]