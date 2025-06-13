from django.contrib import admin
from .models import Client, Report, Message, Property, Enquiry, Billing, Reminder, ReportLog
# Register your models here.
admin.site.register(Client)
admin.site.register(Report)
admin.site.register(Message)
admin.site.register(Property)
admin.site.register(Enquiry)
admin.site.register(Billing)
admin.site.register(Reminder)
admin.site.register(ReportLog)