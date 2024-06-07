from rest_framework import serializers
from .models import Property, Message

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = "__all__"

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"