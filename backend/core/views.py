from .models import Property, Message
from rest_framework import permissions, viewsets
from rest_framework.response import Response
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
        serializer = PropertySerializer(self.queryset, many=True)
        return Response(serializer.data)
    def retrieve(self, request, pk=None):
        property = self.queryset.get(pk=pk)
        serializer = PropertySerializer(property)
        return Response(serializer.data)
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
        property = self.queryset.get(pk=pk)
        property.delete()
        return Response(status=204)
    
