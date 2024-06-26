# Generated by Django 4.1 on 2023-07-02 20:59

from django.db import migrations, models
import ressource.models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Media",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=250)),
                ("file", models.FileField(upload_to=ressource.models.get_media_path)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
