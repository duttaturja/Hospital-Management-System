# Generated by Django 5.1.4 on 2024-12-26 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms_management', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='room_type',
            field=models.CharField(choices=[('General', 'General'), ('Private', 'Private'), ('ICU', 'ICU')], default='General', max_length=50),
        ),
        migrations.AlterField(
            model_name='roombooking',
            name='booked_by',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='roombooking',
            name='booked_from',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='roombooking',
            name='booked_until',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
