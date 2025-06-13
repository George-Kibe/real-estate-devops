"""
Project URLS Layout
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from .views import ServerStatusView

urlpatterns = [
    path("admin-secret/", admin.site.urls),
    path("drf-api/", include('core.urls')),
    path('', ServerStatusView.as_view(), name='server-status'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
