# Generated by Django 5.1.4 on 2024-12-26 19:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctor_management', '0003_alter_appointment_date_alter_appointment_reason_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(choices=[('Scheduled', 'Scheduled'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled')], default='Scheduled', max_length=20),
        ),
    ]
