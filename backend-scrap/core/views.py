"""Views
"""
# Import Q object for complex queries
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PropertySerializer, MessageSerializer, ScrappedPropertySerializer
from .serializers import ClientSerializer, ReportSerializer, EnquirySerializer, BillingSerializer
from .apartments import get_apartments
from .models import Property, Message, Client, Report, Enquiry, Billing

from .send_sms import send_sms


class MessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows messages to be created, viewed and edited
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
        serializer = MessageSerializer(
            data=request.data, context={'request': request})
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


class EnquiryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Enquiries to be created, viewed and edited
    """

    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer

    def list(self, request):
        send_sms()
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            enquiry = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Enquiry not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = EnquirySerializer(enquiry)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = EnquirySerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def update(self, request, pk=None):
        try:
            enquiry = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Enquiry not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = EnquirySerializer(enquiry, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        try:
            enquiry = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Enquiry not found"}, status=status.HTTP_404_NOT_FOUND)
        enquiry.delete()
        return Response(data={"message": "Enquiry deleted successfully"}, status=status.HTTP_200_OK)


class PropertyViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows properties to be created, viewed and edited
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
        serializer = PropertySerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def update(self, request, pk=None):
        try:
            property = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Property not found"}, status=status.HTTP_404_NOT_FOUND)
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

class BillingViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows billings to be created, viewed and edited
    """
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer

    def list(self, request):
        owner_org_id = request.query_params.get('owner_org_id')
        if owner_org_id is not None:
            queryset = Billing.objects.filter(owner_org_id=owner_org_id)
        else:
            queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            billing = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Billing not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = BillingSerializer(billing)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = BillingSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def update(self, request, pk=None):
        try:
            billing = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Billing not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = BillingSerializer(billing, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        try:
            billing = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Billing not found"}, status=status.HTTP_404_NOT_FOUND)
        billing.delete()
        return Response(data={"message": "Billing deleted successfully"}, status=status.HTTP_200_OK)

class ClientViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clients to be created, viewed and edited
    """
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    def list(self, request):
        owner_id = request.query_params.get('owner_id')
        staff_id = request.query_params.get('staff_id')
        email = request.query_params.get('email')
        client_id = request.query_params.get('client_id')
        # queryset = self.filter_queryset(self.get_queryset())
        if owner_id is not None:
            queryset = Client.objects.filter(owner_id=owner_id)
        elif staff_id is not None:
            queryset = Client.objects.filter(staff_id=staff_id)
        elif email is not None:
            queryset = Client.objects.filter(email=email)
        elif client_id is not None:
            queryset = Client.objects.filter(id=client_id)
        else:
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
        serializer = ClientSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def update(self, request, pk=None):
        try:
            client = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
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


class ReportViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows reports to be created, viewed and edited.
    """
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

    def list(self, request):
        client_id = request.query_params.get('client_id')
        staff_id = request.query_params.get('staff_id')
        owner_id = request.query_params.get('owner_id')
        # queryset = self.filter_queryset(self.get_queryset())
        if client_id is not None:
            queryset = Report.objects.filter(
                client_id=client_id).order_by('-created_at')
        elif staff_id is not None:
            queryset = Report.objects.filter(
                staff_id=staff_id).order_by('-created_at')
        elif owner_id is not None:
            queryset = Report.objects.filter(
                owner_id=owner_id).order_by('-created_at')
        else:
            queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            report = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Report not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ReportSerializer(report)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = ReportSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def update(self, request, pk=None):
        try:
            report = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Report not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ReportSerializer(report, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        try:
            report = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Report not found"}, status=status.HTTP_404_NOT_FOUND)
        report.delete()
        return Response(data={"message": "Report deleted successfully"}, status=status.HTTP_200_OK)


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
            # Return an empty queryset if no search term provided
            return Property.objects.none()

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
        apartments = get_apartments(search_term)
        serialized_properties = []
        for apartment in apartments:
            #print(apartment)
            # Assuming 'item' represents each scraped property data
            serializer = ScrappedPropertySerializer(data=apartment)
            if serializer.is_valid():
                # Save the property to Django database (optional)
                serializer.save()
                # Append serialized data to response list
                serialized_properties.append(serializer.data)
            else:
                # Handle validation errors if necessary
                print(serializer.errors)

        # Return the serialized data as JSON response
        return Response(serialized_properties)
