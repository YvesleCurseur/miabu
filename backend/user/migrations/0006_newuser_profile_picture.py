# Generated by Django 4.1 on 2023-05-23 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0005_rename_is_socail_network_newuser_is_social_network"),
    ]

    operations = [
        migrations.AddField(
            model_name="newuser",
            name="profile_picture",
            field=models.URLField(blank=True, null=True),
        ),
    ]
