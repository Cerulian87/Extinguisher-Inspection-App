# Generated by Django 4.1.7 on 2023-04-14 04:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='box',
            name='x_axis',
            field=models.CharField(default=1, max_length=10),
            preserve_default=False,
        ),
    ]
