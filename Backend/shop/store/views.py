from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView, Response, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, get_user_model
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AnonymousUser
from .serializer import ProductSerializer, CartSerializer
from .models import Product , Cart, CartItem
from django.views.generic import TemplateView

User = get_user_model()

class ReactAppView(TemplateView):
    template_name = "index.html"


class Products(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class ProductDeatil(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    
    def get(request, self, pk):
        product = Product.objects.get(pk=pk)
        serializer = ProductSerializer(product).data

        return Response(serializer)


class Authenticate(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            return Response({"hasAccount": True})
        except User.DoesNotExist:
            return Response({"hasAccount": False})


class Password(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        password = request.data.get('password')
        email = request.data.get('email')

        if not email or not password:
            return Response({
                "status": False,
                "message": "Email and password are required"
            }, status=400)

        try:
            user = User.objects.get(email=email)
            auth = authenticate(username=user.username, password=password)
            if auth:
                token, _ = Token.objects.get_or_create(user=auth)
                return Response({
                    "user": auth.first_name,
                    "token": token.key,
                    "status": True
                })
            else:
                return Response({
                    "status": False,
                    "message": "Incorrect password"
                }, status=401)
        except User.DoesNotExist:

            user = User.objects.create_user(username=email, email=email, password=password)
            token = Token.objects.create(user=user)
            return Response({
                "token": token.key,
                "user": user.username,
                "message": "User created successfully",
                "status": True
            })


class userInfo(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        model = User.objects.get(username=user)
        return Response({
            "first_name": model.first_name,
            "last_name": model.last_name,
            "phone_number": model.phone_number,
            "email": model.email,
            "username": model.username
        })
    def post(self, requset):
        first_name = requset.data.get('first_name')
        last_name = requset.data.get('last_name')
        phone_number = requset.data.get('phone')
        username = requset.data.get('username')
        user = requset.user
        model = User.objects.get(username=user)
        model.first_name = first_name
        model.last_name = last_name
        model.phone_number = phone_number
        model.username = username
        model.save()
        print(user, model)
        return Response({"message : info changed successfully"})

class CartItems(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user
        if isinstance(user, AnonymousUser):
            return Response({'error': 'User is not authenticated'}, status=401)
        cart, created = Cart.objects.get_or_create(user=user)
        pq = cart.items.values_list('qty','product')
        total = 0
        for product in pq:
            price = Product.objects.get(id=product[1]).price
            total = total + product[0] * price

        Cart.objects.update(totalPrice=total)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    

    def post(self, request):
        user = request.user
        product_id = request.data.get('product')
        qty = request.data.get('qty', 1)

        if not product_id:
            return Response({'error': 'Product ID is required'}, status=400)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)
        cart, _ = Cart.objects.get_or_create(user=user)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)

        if not created:
            cart_item.qty += int(qty)
        else:
            cart_item.qty = int(qty)

        cart_item.save()

        return Response({
            'message': 'Product added to cart successfully',
            'product': product.title,
            'qty': cart_item.qty
        })

class DeleteItem(APIView):
    def delete(self, request, pk):
        user = request.user

        try:
            Product.objects.get(id=pk)
        except Product.DoesNotExist:
            return Response({'error': 'Product Dose NOT exist'}, status=status.HTTP_404_NOT_FOUND)
        
        cart = Cart.objects.get(user=user)
        try:
            model = CartItem.objects.get(cart=cart, product=pk)
            model.delete()
            return Response({'message':'item deleted successfully from cart'}, status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response({'error':'Item NOT Found'}, status=status.HTTP_404_NOT_FOUND)
        
        

        