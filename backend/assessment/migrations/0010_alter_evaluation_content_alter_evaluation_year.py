# Generated by Django 4.1 on 2023-07-16 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("assessment", "0009_remove_image_abs_url_remove_image_path_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="evaluation",
            name="content",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="evaluation",
            name="year",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
