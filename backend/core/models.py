"""
Core Project Models
1.TimeStampedUUIDModel: Has the common/default attributes. The other classes can inherit
from this class
2.Client: Client Model
3.Report: Report Model
4.Property: Property Model
5. Message: Message Model
6. Enquiry: Enquiry Model
7. Billing: Billing Model
"""
import uuid
import random
import string

from django.db import models
from django.utils.translation import gettext_lazy as _
# from django.contrib.postgres.fields import ArrayField
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
    payor = models.CharField(max_length=100, blank=True, null=True)
    procode = models.CharField(max_length=100, blank=True, null=True)
    units = models.CharField(max_length=100, blank=True, null=True)
    modifier = models.CharField(max_length=100, blank=True, null=True)
    pmiNumber = models.CharField(max_length=100, blank=True, null=True)
    service_type = models.CharField(max_length=100, blank=True, null=True)
    insuranceMemberID = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return str(self.client_name)


class Report(TimeStampedUUIDModel):
    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    owner_id = models.CharField(max_length=100, blank=True, null=True)
    client_name = models.CharField(max_length=100, null=True, blank=True)
    client_email = models.EmailField(null=True, blank=True)
    client_id = models.CharField(max_length=100, null=True, blank=True)
    client_phone_number = models.CharField(max_length=18, blank=True)
    client_address = models.CharField(max_length=255, blank=True)
    report_type = models.CharField(max_length=100, null=True, blank=True)
    staff_id = models.CharField(max_length=100, blank=True, null=True)
    staff_name = models.CharField(max_length=100, blank=True, null=True)
    properties = models.JSONField(default=list, blank=True, null=True)
    tracking_status = models.CharField(max_length=100, null=True, blank=True, default="Pending")
    additional_resources = models.JSONField(default=list, blank=True, null=True)
    report_activities = models.JSONField(default=list, blank=True, null=True)
    status = models.CharField(max_length=100, null=True, blank=True)
    report_draft = models.TextField(null=True, blank=True)
    report_final = models.TextField(null=True, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    follow_up_notes = models.TextField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    report_date = models.DateField(null=True, blank=True)
    report_view_type = models.CharField(max_length=100, null=True, blank=True)
    report_location = models.CharField(max_length=100, null=True, blank=True)
    isBilled = models.BooleanField(default=False)
    status = models.CharField(max_length=100, null=True, blank=True)
    housing_coordinator_name = models.CharField(
        max_length=100, null=True, blank=True)
    housing_coordinator_id = models.CharField(
        max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.client_id} - {self.report_type}"


class Property(TimeStampedUUIDModel):
    title = models.CharField(verbose_name=_("Property Title"), max_length=250)
    link = models.CharField(verbose_name=_("Property Link"), max_length=250, null=True)
    description = models.TextField(
        verbose_name=_("Description"),
        default="No Default description...update me please....",
    )
    property_detail_link = models.CharField(verbose_name=_(
        "Property detail Link"), max_length=500, default="")
    city = models.CharField(verbose_name=_("City"), max_length=180, default="")
    postal_code = models.CharField(verbose_name=_(
        "Postal Code"), max_length=100, default="140", null=True)
    street_address = models.CharField(verbose_name=_(
        "Street Address"), max_length=150, default="")
    price = models.IntegerField(verbose_name=_("Price"), default=1)
    email_listing = models.CharField(verbose_name=_(
        "Listing Email"), max_length=500, default="")
    phone_number = models.CharField(verbose_name=_(
        "Phone Number"), max_length=50, default="")
    details_link = models.CharField(verbose_name=_(
        "Details Link"), max_length=50, default="")
    application_link = models.CharField(verbose_name=_(
        "Application Email"), max_length=100, default="")
    plot_area = models.DecimalField(verbose_name=_(
        "Plot Area(m^2)"), max_digits=8, decimal_places=2, default=0.0)
    total_floors = models.IntegerField(
        verbose_name=_("Number of floors"), default=0)
    bedrooms = models.IntegerField(verbose_name=_("Bedrooms"), default=1)
    bathrooms = models.IntegerField(verbose_name=_("Bathrooms"), default=1)
    advert_type = models.CharField(max_length=50, default="FOR RENT")
    property_type = models.CharField(max_length=50, default="Apartment")
    # images = ArrayField(models.URLField(), blank=True, default=list)
    images = models.JSONField(default=list, null=True, blank=True)
    amenities = models.JSONField(default=list, null=True, blank=True)
    source = models.CharField(max_length=50, default="")
    client_email = models.EmailField(blank=True, null=True)
    client_confirm_favorite = models.BooleanField(default=False)
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
        return str(self.name)


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
        return str(self.name)


class Billing(TimeStampedUUIDModel):
    report = models.ForeignKey(
        Report, on_delete=models.CASCADE, null=True, blank=True)
    service_date_start = models.DateField(null=True, blank=True)
    service_date_end = models.DateField(null=True, blank=True)
    client_name = models.CharField(max_length=100, null=True, blank=True)
    client_id = models.CharField(max_length=100, null=True, blank=True)
    owner_org_id = models.CharField(max_length=100, null=True, blank=True)
    housing_coordinator_name = models.CharField(
        max_length=100, null=True, blank=True)
    housing_coordinator_id = models.CharField(
        max_length=100, null=True, blank=True)
    claim_amount = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    bill_status = models.CharField(max_length=50, choices=[
        ('Scheduled', 'Scheduled'),
        ('Submitted', 'Submitted'),
        ('UnSubmitted', 'UnSubmitted'),
    ], null=True, default="Scheduled", blank=True)
    scheduled_hours = models.DecimalField(
        max_digits=5, decimal_places=2, help_text="Scheduled hours", null=True, blank=True)
    notes = models.TextField(null=True, blank=True,
        default="Notes not Captured")
    worked_hours = models.DecimalField(
        max_digits=5, decimal_places=2, help_text="Hours worked", null=True, blank=True)
    billed_hours = models.DecimalField(
        max_digits=5, decimal_places=2, help_text="Hours billed", null=True, blank=True)
    approval_status = models.CharField(max_length=50, choices=[
        ('Approved', 'Approved'),
        ('Not Approved', 'Not Approved'),
    ], default="Not Approved")
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    pro_code = models.CharField(max_length=10, null=True,
        choices=[("H2015", "H2015"), ("H0043", "H0043"),
            ("T1017", "T1017"), ("T2024", "T2024"),
            ("T2038", "T2038")], default="H2015",  blank=True)
    modifier = models.CharField(
        max_length=10, null=True, blank=True, default="U8")
    payor = models.CharField(max_length=5, null=True,
                             blank=True, default="UCARE")

    class Meta:
        verbose_name = "Billing"
        verbose_name_plural = "Billings"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.client_name} ({self.service_date_start} - {self.service_date_end})"
