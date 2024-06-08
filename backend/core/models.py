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
 
class Property(TimeStampedUUIDModel):
    title = models.CharField(verbose_name=_("Property Title"), max_length=250)
    link =  models.CharField(verbose_name=_("Property Link"), max_length=250)
    description = models.TextField(
        verbose_name=_("Description"),
        default="Default description...update me please....",
    )
    property_detail_link=models.CharField(
        verbose_name=_("Property detail Link"), max_length=500, default=""
    )
    city = models.CharField(verbose_name=_("City"), max_length=180, default="")
    postal_code = models.CharField(
        verbose_name=_("Postal Code"), max_length=100, default="140", null=True
    )
    street_address = models.CharField(
        verbose_name=_("Street Address"), max_length=150, default=""
    )
    price = models.CharField(
        verbose_name=_("Price Range"), max_length=150, default=""
    )
    email_listing=models.CharField(
        verbose_name=_("Listing Email"), max_length=500, default=""
    )
    phone_number=models.CharField(
        verbose_name=_("Phone Number"), max_length=50, default=""
    )
    details_link=models.CharField(
        verbose_name=_("Details Link"), max_length=50, default=""
    )
    application_link=models.CharField(
        verbose_name=_("Application Email"), max_length=100, default=""
    )
    plot_area = models.DecimalField(
        verbose_name=_("Plot Area(m^2)"), max_digits=8, decimal_places=2, default=0.0
    )
    total_floors = models.IntegerField(verbose_name=_("Number of floors"), default=0)
    bedrooms = models.IntegerField(verbose_name=_("Bedrooms"), default=1)
    bathrooms = models.DecimalField(
        verbose_name=_("Bathrooms"), max_digits=4, decimal_places=2, default=1.0
    )
    advert_type = models.CharField(
        verbose_name=_("Advert Type"),
        max_length=50,
        default="FOR RENT",
    )
    property_type = models.CharField(
        verbose_name=_("Property Type"),
        max_length=50,
        default= "Apartment",
    )
    #images = ArrayField(models.URLField(), blank=True, default=list) 
    images = models.JSONField(default=list, null=True, blank=True)
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

class Message(TimeStampedUUIDModel):
    name = models.CharField(max_length=100)
    message = models.TextField()
    class Meta:
        verbose_name = "Message"
        verbose_name_plural = "Messages"
    def __str__(self):
        return self.name
