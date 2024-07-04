from .models import Property, Message, Client
from rest_framework import permissions, viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from .serializers import PropertySerializer, MessageSerializer, ScrappedPropertySerializer, ClientSerializer
from .apartments import get_apartments
from django.db.models import Q  # Import Q object for complex queries

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

class ClientViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """

    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        try:
            client = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ClientSerializer(client)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        serializer = ClientSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def update(self, request, pk=None):
        client = self.queryset.get(pk=pk)
        serializer = ClientSerializer(client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def destroy(self, request, pk=None):
        try:
            client = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        client.delete()
        return Response(data={"message": "Client deleted successfully"}, status=status.HTTP_200_OK)
 
class PropertySearchAPIView(generics.ListAPIView):
    serializer_class = PropertySerializer

    def get_queryset(self):
        search_term = self.request.query_params.get('search', None)
        print("Search term: ", search_term)
        if search_term:
            queryset = Property.objects.filter(
                Q(title__icontains=search_term) |
                Q(description__icontains=search_term) |
                Q(city__icontains=search_term) |
                Q(postal_code__icontains=search_term) |
                Q(street_address__icontains=search_term) |
                Q(price__icontains=search_term) |
                Q(email_listing__icontains=search_term) |
                Q(phone_number__icontains=search_term) |
                Q(advert_type__icontains=search_term) |
                Q(property_type__icontains=search_term)
            )
            return queryset
        else:
            return Property.objects.none()  # Return an empty queryset if no search term provided

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)  # Paginate the queryset
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)
class ScrapeProperties(APIView):
    def get(self, request):
        # print("Search term: ", request.query_params.get('search'))
        search_term = request.query_params.get('search')
        # Perform scraping based on search term
        properties = []
        apartments = get_apartments(search_term)
        serialized_properties = []
        for apartment in apartments:
            print(apartment)
            # Assuming 'item' represents each scraped property data
            serializer = ScrappedPropertySerializer(data=apartment)
            if serializer.is_valid():
                # Save the property to Django database (optional)
                serializer.save()
                # Append serialized data to response list
                serialized_properties.append(serializer.data)
            else:
                # Handle validation errors if necessary
                pass
        
        # Return the serialized data as JSON response
        return Response(serialized_properties)