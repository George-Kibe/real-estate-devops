"""_summary_
This file contains the signal handlers for the Report and Billing models.
When a Report is created or updated, a corresponding Billing record is created or updated.
"""
from decimal import Decimal
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Report
from .models import Billing  

@receiver(post_save, sender=Report)
def create_or_update_billing_for_report(sender, instance, created, **kwargs):
    if instance.start_time and instance.end_time:
        hours = Decimal(instance.end_time.hour - instance.start_time.hour)
    else:
        hours = Decimal("0")
    if created:
        Billing.objects.create(
            report=instance,
            client_name=instance.client_name,
            client_id=instance.client_id,
            service_date_start=instance.report_date,
            service_date_end=instance.report_date,
            owner_org_id=instance.owner_id,
            housing_coordinator_name=instance.housing_coordinator_name,
            housing_coordinator_id=instance.housing_coordinator_id,
            start_time=instance.start_time,
            end_time=instance.end_time,
            worked_hours=hours,
            billed_hours=hours,
            notes = instance.report_final,
            # To get claim amount, get start time and end time in hours then multiply by the rate of 20
            claim_amount= (instance.end_time.hour - instance.start_time.hour) * 20
        )
    else:
        # Only update if a related billing exists
        try:
            billing = Billing.objects.get(report=instance)
            billing.client_name = instance.client_name
            billing.client_id = instance.client_id
            billing.service_date_start = instance.report_date
            billing.service_date_end = instance.report_date
            billing.owner_org_id = instance.owner_id
            billing.housing_coordinator_name=instance.housing_coordinator_name
            billing.housing_coordinator_id=instance.housing_coordinator_id
            billing.claim_amount = hours * Decimal("20.00")
            billing.worked_hours = hours
            billing.billed_hours = hours
            billing.start_time=instance.start_time
            billing.end_time=instance.end_time
            billing.notes = instance.report_final
            billing.save()
            
        except Billing.DoesNotExist:
            # If somehow no billing exists, create one (backup safety)
            Billing.objects.create(
                report=instance,
                client_name=instance.client_name,
                client_id=instance.client_id,
                service_date_start=instance.report_date,
                service_date_end=instance.report_date,
                owner_org_id=instance.owner_id,
                housing_coordinator_name=instance.housing_coordinator_name,
                housing_coordinator_id=instance.housing_coordinator_id,
                start_time=instance.start_time,
                end_time=instance.end_time,
                worked_hours=hours,
                billed_hours=hours,
                notes = instance.report_final,
                # To get claim amount, get start time and end time in hours then multiply by the rate of 20
                claim_amount= hours * Decimal("20.00")
            )

