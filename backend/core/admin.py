from django.contrib import admin
from .models import Property, Message, Client, Report, Enquiry

# Register your models here.
admin.site.register(Property)
admin.site.register(Message)
admin.site.register(Client)
admin.site.register(Report)
admin.site.register(Enquiry)