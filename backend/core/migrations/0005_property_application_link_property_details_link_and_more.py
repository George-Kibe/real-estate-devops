# Generated by Django 5.0.6 on 2024-06-07 13:22

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0004_remove_property_published_status_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="property",
            name="application_link",
            field=models.CharField(
                default="", max_length=100, verbose_name="Application Email"
            ),
        ),
        migrations.AddField(
            model_name="property",
            name="details_link",
            field=models.CharField(
                default="", max_length=50, verbose_name="Details Link"
            ),
        ),
        migrations.AddField(
            model_name="property",
            name="email_listing",
            field=models.CharField(
                default="", max_length=500, verbose_name="Listing Email"
            ),
        ),
        migrations.AddField(
            model_name="property",
            name="phone_number",
            field=models.CharField(
                default="", max_length=50, verbose_name="Phone Number"
            ),
        ),
        migrations.AddField(
            model_name="property",
            name="property_detail_link",
            field=models.CharField(
                default="", max_length=500, verbose_name="Property detail Link"
            ),
        ),
        migrations.AlterField(
            model_name="property",
            name="city",
            field=models.CharField(default="", max_length=180, verbose_name="City"),
        ),
        migrations.AlterField(
            model_name="property",
            name="street_address",
            field=models.CharField(
                default="", max_length=150, verbose_name="Street Address"
            ),
        ),
    ]