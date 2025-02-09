"""URLs for the core application
"""
from .views import PropertyViewSet, MessageViewSet, ScrapeProperties, PropertySearchAPIView
from .views import ClientViewSet, ReportViewSet, EnquiryViewSet, BillingViewSet

from django.urls import path

urlpatterns = [
    # messages endpoints
    path('messages/',
         MessageViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('messages/<int:pk>/',
         MessageViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    # properties endpoints
    path('properties/',
         PropertyViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('properties/<int:pk>/', PropertyViewSet.as_view(
        {'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    # clients endpoints
    path('clients/', ClientViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('clients/<int:pk>/',
         ClientViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    # reports endpoints
    path('reports/', ReportViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('reports/<int:pk>/',
         ReportViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    # enquiries endpoints
    path('enquiries/',
         EnquiryViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('enquiries/<int:pk>/',
         EnquiryViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    # Billings endpoints
    path('billings/', BillingViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('billings/<int:pk>/',
         BillingViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    # scrapping endpoint
    path('scrapping/', ScrapeProperties.as_view(), name='scrape-properties'),
    # search properties endpoint
    path('search-properties/', PropertySearchAPIView.as_view(),
         name='property-search'),
]
