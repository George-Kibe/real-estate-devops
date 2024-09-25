import uuid
import random
import string

from django.db import models
from django.utils.translation import gettext_lazy as _
#from django.contrib.postgres.fields import ArrayField
# Create your models here.
class TimeStampedUUIDModel(models.Model):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
 
class Client(TimeStampedUUIDModel):
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    client_name = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=100, blank=True)
    address = models.CharField(max_length=255, blank=True)
    email = models.EmailField(blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    city = models.CharField(max_length=100, blank=True)
    house_type = models.CharField(max_length=50, blank=True)
    additional_info = models.TextField(blank=True, null=True)
    staff_id = models.CharField(max_length=100, blank=True, null=True)
    owner_id = models.CharField(max_length=100, blank=True, null=True)
    staff_email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.client_name

class Report(TimeStampedUUIDModel):
    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    owner_id = models.CharField(max_length=100, blank=True, null=True)
    client_name = models.CharField(max_length=100, null=True, blank=True)
    client_id = models.CharField(max_length=100, null=True, blank=True)
    client_phone_number = models.CharField(max_length=18, blank=True)
    report_type = models.CharField(max_length=100, null=True, blank=True)
    staff_id = models.CharField(max_length=100, blank=True, null=True)
    properties = models.JSONField(default=list, blank=True, null=True)
    status = models.CharField(max_length=100, null=True, blank=True)
    report_draft = models.TextField(null=True, blank=True)
    report_final = models.TextField(null=True, blank=True)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.client_id} - {self.report_type}"
class Property(TimeStampedUUIDModel):
    title = models.CharField(verbose_name=_("Property Title"), max_length=250)
    link =  models.CharField(verbose_name=_("Property Link"), max_length=250)
    description = models.TextField(
        verbose_name=_("Description"),
        default="Default description...update me please....",
    )
    property_detail_link=models.CharField(verbose_name=_("Property detail Link"), max_length=500, default="")
    city = models.CharField(verbose_name=_("City"), max_length=180, default="")
    postal_code = models.CharField(verbose_name=_("Postal Code"), max_length=100, default="140", null=True)
    street_address = models.CharField(verbose_name=_("Street Address"), max_length=150, default="")
    price = models.IntegerField(verbose_name=_("Price"), default=1)
    email_listing=models.CharField(verbose_name=_("Listing Email"), max_length=500, default="")
    phone_number=models.CharField(verbose_name=_("Phone Number"), max_length=50, default="")
    details_link=models.CharField(verbose_name=_("Details Link"), max_length=50, default="")
    application_link=models.CharField(verbose_name=_("Application Email"), max_length=100, default="")
    plot_area = models.DecimalField(verbose_name=_("Plot Area(m^2)"), max_digits=8, decimal_places=2,default=0.0)
    total_floors = models.IntegerField(verbose_name=_("Number of floors"), default=0)
    bedrooms = models.IntegerField(verbose_name=_("Bedrooms"), default=1)
    bathrooms = models.IntegerField(verbose_name=_("Bathrooms"), default=1)
    advert_type = models.CharField(max_length=50, default="FOR RENT")
    property_type = models.CharField(max_length=50,default= "Apartment")
    #images = ArrayField(models.URLField(), blank=True, default=list) 
    images = models.JSONField(default=list, null=True, blank=True)
    amenities = models.JSONField(default=list, null=True, blank=True)
    source = models.CharField(max_length=50, default="housinglink")
    
    class Meta:
        verbose_name = "Property"
        verbose_name_plural = "Properties"

    def save(self, *args, **kwargs):
        self.title = str.title(self.title)
        self.description = str.capitalize(self.description)
        self.ref_code = "".join(
            random.choices(string.ascii_uppercase + string.digits, k=10)
        )
        super(Property, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.title

class Message(TimeStampedUUIDModel):
    name = models.CharField(max_length=100)
    message = models.TextField()
    class Meta:
        verbose_name = "Message"
        verbose_name_plural = "Messages"
    def __str__(self):
        return self.name

class Enquiry(TimeStampedUUIDModel):
    name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    message = models.TextField()
    status = models.CharField(max_length=100, default="Pending")
    class Meta:
        verbose_name = "Enquiry"
        verbose_name_plural = "Enquiries"
        ordering = ["-created_at"]
        
    def __str__(self):
        return self.name