from django.db import models
import uuid
        
class Resume(models.Model):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    resumeId = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    title = models.CharField(max_length=100)
    userName = models.CharField(max_length=100)
    userEmail = models.CharField(max_length=100)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Resume"
        verbose_name_plural = "Resumes"
    def __str__(self):
        return self.title
