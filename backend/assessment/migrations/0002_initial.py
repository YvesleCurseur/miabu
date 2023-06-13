# Generated by Django 4.1 on 2023-06-13 21:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("forum", "0001_initial"),
        ("assessment", "0001_initial"),
    ]

    operations = [
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