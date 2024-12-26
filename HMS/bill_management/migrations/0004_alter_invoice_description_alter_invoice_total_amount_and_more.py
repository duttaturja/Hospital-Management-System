# Generated by Django 5.1.4 on 2024-12-26 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bill_management', '0003_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='total_amount',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='salary',
            name='amount',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='salary',
            name='payment_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
