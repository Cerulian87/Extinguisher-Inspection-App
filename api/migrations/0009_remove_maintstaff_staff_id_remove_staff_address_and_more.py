# Generated by Django 4.1.7 on 2023-04-18 23:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0008_checklist_file_txt'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='maintstaff',
            name='staff_id',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='address',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='email',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='f_name',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='l_name',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='phone',
        ),
        migrations.AddField(
            model_name='maintstaff',
            name='username',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='staff',
            name='username',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='boxmaint',
            name='fix_by',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]