from rest_framework import serializers
from .models import Property, Message, Client, Report, Enquiry, Billing, Reminder, ReportLog


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = "__all__"


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = "__all__"


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"


class BillingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Billing
        fields = "__all__"


class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = "__all__"


class ReportLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportLog
        fields = "__all__"


class ScrappedPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = [
            'title', 'street_address', 'price', 'description', 'bathrooms',
            'phone_number', 'amenities', 'images'  # Include other fields as needed
        ]
