"""
Project URLS Layout
"""
from django.views.static import serve
from django.urls import re_path
from django.contrib import admin
from django.urls import path, include
from .views import ServerStatusView

urlpatterns = [
    path("supersecret/", admin.site.urls),
    path("api/", include('core.urls')),
    path("api/", include('resume.urls')),
    path('', ServerStatusView.as_view(), name='server-status'),
    re_path(r'^.well-known/acme-challenge/(.*)$', serve,
            {'document_root': r'C:\Users\Administrator\Downloads\project\backend\.well-known\acme-challenge'}),
]
