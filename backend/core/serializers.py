from rest_framework import serializers
from .models import Property, Message, Client

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = "__all__"

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"

class ScrappedPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = [
            'title', 'street_address', 'price', 'description', 'bathrooms',
            'phone_number', 'amenities', 'images'  # Include other fields as needed
        ]
