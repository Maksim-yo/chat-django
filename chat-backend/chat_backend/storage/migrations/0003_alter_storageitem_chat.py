# Generated by Django 5.0.3 on 2024-04-28 01:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("chat", "0003_alter_chatline_file_delete_file"),
        ("storage", "0002_remove_storageitem_last_modified"),
    ]

    operations = [
        migrations.AlterField(
            model_name="storageitem",
            name="chat",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="items",
                to="chat.chat",
            ),
        ),
    ]
