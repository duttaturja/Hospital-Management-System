# Generated by Django 5.1.4 on 2024-12-26 12:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('patient_management', '0004_alter_patientprofile_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patientprofile',
            name='user',
        ),
    ]
