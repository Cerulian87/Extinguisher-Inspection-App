# Generated by Django 4.1.7 on 2023-04-18 05:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_rename_box_maint_boxmaint_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='checklist',
            name='list_item',
            field=models.CharField(max_length=1500),
        ),
    ]
