# Generated by Django 5.1.4 on 2024-12-25 16:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bill_management', '0001_initial'),
        ('patient_management', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='invoice',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='invoices', to='patient_management.patientprofile'),
        ),
    ]
