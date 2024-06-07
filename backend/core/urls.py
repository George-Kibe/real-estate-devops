from .views import PropertyViewSet, MessageViewSet
from django.urls import path

urlpatterns = [
    path('messages/', MessageViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('messages/<int:pk>/', MessageViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('properties/', PropertyViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('properties/<int:pk>/', PropertyViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
]