# Generated by Django 4.1.7 on 2023-04-30 19:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_checklist_file_txt'),
    ]

    operations = [
        migrations.CreateModel(
            name='InspectorAssignments',
            fields=[
                ('assignment_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('box_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.box')),
                ('ext_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.extinguisher')),
            ],
        ),
    ]
