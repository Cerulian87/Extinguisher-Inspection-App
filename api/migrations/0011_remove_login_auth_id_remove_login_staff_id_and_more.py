# Generated by Django 4.1.7 on 2023-04-19 00:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0010_remove_clog_login_id_clog_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='login',
            name='auth_id',
        ),
        migrations.RemoveField(
            model_name='login',
            name='staff_id',
        ),
        migrations.RemoveField(
            model_name='login',
            name='username',
        ),
        migrations.RemoveField(
            model_name='extstatus',
            name='staff_id',
        ),
        migrations.AlterField(
            model_name='boxstatus',
            name='comp_by',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='boxstatus',
            name='log_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='extmaint',
            name='replace_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='wareops',
            name='insp_by',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='wareops',
            name='rec_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Auth',
        ),
        migrations.DeleteModel(
            name='Login',
        ),
    ]
