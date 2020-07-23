# Generated by Django 3.0.8 on 2020-07-22 22:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='productID',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='reviews',
            name='score',
            field=models.CharField(max_length=3),
        ),
    ]
