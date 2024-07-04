from django.shortcuts import render

# Create your views here.
from .models import Resume, Education, Experience
from rest_framework import permissions, viewsets, status, generics
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from .serializers import ResumeSerializer, EducationSerializer, ExperienceSerializer


class ResumeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows resumes to be viewed or edited.
    """

    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer

    def list(self, request):
        email = self.request.query_params.get('email', None)
        print("Email: ", email)
        queryset = self.filter_queryset(self.get_queryset())
        if email is not None:
            queryset = self.queryset.filter(userEmail=email)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        try:
            resume = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Resume not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ResumeSerializer(resume)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def create(self, request, *args, **kwargs):
        serializer = ResumeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    def update(self, request, pk=None):
        resume = self.queryset.get(pk=pk)
        serializer = ResumeSerializer(resume, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    def destroy(self, request, pk=None):
        try:
            resume = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Resume not found"}, status=status.HTTP_404_NOT_FOUND)
        resume.delete()
        return Response(data={"message": "Resume deleted successfully"}, status=status.HTTP_200_OK)
    
class EducationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows educations to be viewed or edited.
    """

    queryset = Education.objects.all()
    serializer_class = EducationSerializer

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
            education = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Education not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = EducationSerializer(education)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def create(self, request, *args, **kwargs):
        serializer = EducationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    def update(self, request, pk=None):
        education = self.queryset.get(pk=pk)
        serializer = EducationSerializer(education, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    def destroy(self, request, pk=None):
        try:
            education = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Education not found"}, status=status.HTTP_404_NOT_FOUND)
        education.delete()
        return Response(data={"message": "Education deleted successfully"}, status=status.HTTP_200_OK)

class ExperienceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows educations to be viewed or edited.
    """

    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

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
            education = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Education not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ExperienceSerializer(education)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def create(self, request, *args, **kwargs):
        serializer = ExperienceSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    def update(self, request, pk=None):
        education = self.queryset.get(pk=pk)
        serializer = ExperienceSerializer(education, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    def destroy(self, request, pk=None):
        try:
            education = self.queryset.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(data={"error": "Education not found"}, status=status.HTTP_404_NOT_FOUND)
        resume.delete()
        return Response(data={"message": "Education deleted successfully"}, status=status.HTTP_200_OK)
