# Generated by Django 5.0.6 on 2024-06-07 09:29

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0002_message"),
    ]

    operations = [
        migrations.AlterField(
            model_name="property",
            name="link",
            field=models.CharField(max_length=250, verbose_name="Property Link"),
        ),
    ]