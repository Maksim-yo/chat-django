# Generated by Django 5.0.3 on 2024-04-28 01:59

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="chatuser",
            name="avatar",
            field=models.CharField(default="default", max_length=20),
            preserve_default=False,
        ),
    ]
