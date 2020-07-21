from rest_framework import serializers
from .models import products,reviews

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = reviews
        fields = ('pk', 'productId', 'userID', 'profileName', 'helpfulness', 'score', 'time', 'summary', 'text')