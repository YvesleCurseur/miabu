# Generated by Django 4.1 on 2023-06-13 20:28

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("forum", "0004_alter_topic_media"),
    ]

    operations = [
        migrations.CreateModel(
            name="Course",
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
                ("name", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Domain",
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
                ("name", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Establishment",
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
                ("name", models.CharField(max_length=100)),
                ("description", models.CharField(blank=True, max_length=100)),
                ("location", models.CharField(blank=True, max_length=100)),
                ("create_at", models.DateTimeField(default=django.utils.timezone.now)),
                ("update_at", models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name="Level",
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
                ("name", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Evaluation",
            fields=[
                (
                    "topic_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="forum.topic",
                    ),
                ),
                ("visits", models.PositiveIntegerField(default=0)),
                ("year", models.CharField(max_length=100)),
                (
                    "course",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="assessement_evaluations",
                        to="assessment.course",
                    ),
                ),
                (
                    "domain",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="assessement_evaluations",
                        to="assessment.domain",
                    ),
                ),
                (
                    "establishment",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="assessement_evaluations",
                        to="assessment.establishment",
                    ),
                ),
                (
                    "level",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="assessement_evaluations",
                        to="assessment.level",
                    ),
                ),
            ],
            bases=("forum.topic",),
        ),
        migrations.AddField(
            model_name="course",
            name="domain",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="assessment.domain",
            ),
        ),
        migrations.AddField(
            model_name="course",
            name="establishment",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="assessment.establishment",
            ),
        ),
        migrations.AddField(
            model_name="course",
            name="level",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="assessment.level",
            ),
        ),
    ]
