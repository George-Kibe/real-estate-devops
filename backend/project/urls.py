"""
Project URLS Layout
"""
from django.contrib import admin
from django.urls import path, include
from .views import ServerStatusView

urlpatterns = [
    path("admin-secret/", admin.site.urls),
    path("drf-api/", include('core.urls')),
    path('', ServerStatusView.as_view(), name='server-status'),
]