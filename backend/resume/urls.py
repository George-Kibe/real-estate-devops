from .views import  ResumeViewSet, EducationViewSet, ExperienceViewSet
from django.urls import path

urlpatterns = [
    path('resume/', ResumeViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('resume/<int:pk>/', ResumeViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('education/', EducationViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('education/<int:pk>/', EducationViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('experience/', ExperienceViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('experience/<int:pk>/', ExperienceViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
]