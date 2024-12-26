# Generated by Django 5.1.4 on 2024-12-26 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Admission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('admission_date', models.DateTimeField(auto_now_add=True)),
                ('discharge_date', models.DateTimeField(blank=True, null=True)),
                ('reason', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='AppointmentBooking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('appointment_date', models.DateTimeField()),
                ('symptoms', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='PatientProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_birth', models.DateField()),
                ('address', models.TextField()),
                ('contact_number', models.CharField(max_length=15)),
                ('emergency_contact', models.CharField(max_length=15)),
                ('medical_history', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
