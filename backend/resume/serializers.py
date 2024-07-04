from rest_framework import serializers
from .models import Resume, Education, Experience

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = "__all__"

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = "__all__"

class ResumeSerializer(serializers.ModelSerializer):
    experience = ExperienceSerializer(many=True, read_only=True)
    education = EducationSerializer(many=True, read_only=True)
    class Meta:
        model = Resume
        fields = "__all__"

