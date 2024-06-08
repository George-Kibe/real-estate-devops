from .models import Property, Message
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from .serializers import PropertySerializer, MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows brands to be viewed or edited.
    """

    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def list(self, request):
        serializer = MessageSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        message = self.queryset.get(pk=pk)
        serializer = MessageSerializer(message)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = MessageSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def update(self, request, pk=None):
        message = self.queryset.get(pk=pk)
        serializer = MessageSerializer(message, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    def destroy(self, request, pk=None):
        message = self.queryset.get(pk=pk)
        message.delete()
        return Response(status=204)

class PropertyViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows brands to be viewed or edited.
    """

    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def list(self, request):
        # serializer = PropertySerializer(self.queryset, many=True)
        # return Response(serializer.data)
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        try:
            property = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Property not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = PropertySerializer(property)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def create(self, request, *args, **kwargs):
        serializer = PropertySerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    def update(self, request, pk=None):
        property = self.queryset.get(pk=pk)
        serializer = PropertySerializer(property, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    def destroy(self, request, pk=None):
        try:
            property = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Property not found"}, status=status.HTTP_404_NOT_FOUND)
        property.delete()
        return Response(data={"message": "Property deleted successfully"}, status=status.HTTP_200_OK)
    
