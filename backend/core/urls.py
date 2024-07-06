from .views import PropertyViewSet, MessageViewSet, ScrapeProperties, PropertySearchAPIView, ClientViewSet, ReportViewSet

from django.urls import path

urlpatterns = [
    path('messages/', MessageViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('messages/<int:pk>/', MessageViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('properties/', PropertyViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('properties/<int:pk>/', PropertyViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('clients/', ClientViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('clients/<int:pk>/', ClientViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('reports/', ReportViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('reports/<int:pk>/', ReportViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('scrapping/', ScrapeProperties.as_view(), name='scrape-properties'),
    path('search-properties/', PropertySearchAPIView.as_view(), name='property-search'),
]