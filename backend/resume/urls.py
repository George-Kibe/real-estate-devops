from .views import  ResumeViewSet
from django.urls import path

urlpatterns = [
    path('resume/', ResumeViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('resume/<int:pk>/', ResumeViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
]