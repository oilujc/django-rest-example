from rest_framework import serializers

from app.models import (Products, )

class ProductsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Products
		fields = ('id','title', 'description', 'is_active', 'create_at')
		read_only_fields = ('id','title','description','create_at',)
