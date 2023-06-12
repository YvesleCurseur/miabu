# Generated by Django 4.1 on 2023-06-10 15:14

import cloudinary_storage.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("forum", "0002_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="topic",
            name="image",
            field=models.ImageField(blank=True, upload_to="images/"),
        ),
        migrations.RemoveField(
            model_name="topic",
            name="media",
        ),
        migrations.AddField(
            model_name="topic",
            name="media",
            field=models.ImageField(
                blank=True,
                storage=cloudinary_storage.storage.RawMediaCloudinaryStorage(),
                upload_to="raw/",
            ),
        ),
    ]