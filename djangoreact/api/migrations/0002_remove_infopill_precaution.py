# Generated by Django 3.2.9 on 2021-11-24 05:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='infopill',
            name='precaution',
        ),
    ]