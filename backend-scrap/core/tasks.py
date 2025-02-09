from django.apps import apps
from celery import shared_task


@shared_task
def scrap_apartments_com(search_term):
    Property = apps.get_model('core.Property')
    # open the url
    #scrap the url
    # save the data to the database
    # loop through all returned properties and save them to the database
    Property.objects.create(
        user=apps.get_model('accounts.User').objects.get(id=user_id),
        message=message
    )