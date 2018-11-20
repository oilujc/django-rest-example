from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import ProductsSerializer
from app.models import Products

class ProductsList(generics.ListAPIView):
	queryset = Products.objects.all()
	serializer_class = ProductsSerializer
	permission_classes = (AllowAny,)


class ProductsUpdate(generics.UpdateAPIView):
	queryset = Products.objects.all()
	serializer_class = ProductsSerializer
	permission_classes = (AllowAny,)
	