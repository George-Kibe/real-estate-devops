from django.db import models
import uuid

class Experience(models.Model):
    title = models.CharField(max_length=255, null=True) 
    company_name = models.CharField(max_length=255, null=True) 
    city = models.CharField(max_length=100, null=True) 
    state = models.CharField(max_length=100, null=True) 
    start_date = models.CharField(max_length=100, null=True) 
    end_date = models.CharField(max_length=100, blank=True, null=True)
    currently_working = models.BooleanField(default=False)
    work_summary = models.TextField()

    def __str__(self):
        return f"{self.title} at {self.company_name}"

class Education(models.Model):
    university_name = models.CharField(max_length=255, null=True) 
    start_date = models.CharField(max_length=100, null=True) 
    end_date = models.CharField(max_length=100, null=True) 
    degree = models.CharField(max_length=100, null=True) 
    major = models.CharField(max_length=100, null=True) 
    description = models.TextField()

    def __str__(self):
        return f"{self.degree} in {self.major} from {self.university_name}"

class Resume(models.Model):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    resumeId = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    title = models.CharField(max_length=100)
    userName = models.CharField(max_length=100)
    userEmail = models.CharField(max_length=100)
    
    firstName = models.CharField(max_length=100, null=True)    
    lastName = models.CharField(max_length=100, null=True)
    jobTitle = models.CharField(max_length=255, null=True)
    address = models.CharField(max_length=100, null=True)   
    themeColor = models.CharField(max_length=7, null=True) 
    phone = models.CharField(max_length=100, null=True)
    summary = models.TextField(null=True)
    # skills in key value
    experience = models.ManyToManyField(Experience, related_name='resumes', null=True)
    education = models.ManyToManyField(Education, related_name='resumes', null=True)
    skills = models.JSONField(null=True)
    
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Resume"
        verbose_name_plural = "Resumes"
    def __str__(self):
        return self.title
