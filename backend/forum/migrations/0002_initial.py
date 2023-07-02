# Generated by Django 4.1 on 2023-06-20 15:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("forum", "0001_initial"),
        ("assessment", "0003_initial"),
        ("ressource", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="visit",
            name="author",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="visit",
            name="topic",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="forum.topic"
            ),
        ),
        migrations.AddField(
            model_name="topic",
            name="answer",
            field=models.ManyToManyField(blank=True, to="forum.answer"),
        ),
        migrations.AddField(
            model_name="topic",
            name="author",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="forum_topics",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="topic",
            name="category",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="forum.category",
            ),
        ),
        migrations.AddField(
            model_name="share",
            name="author",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddField(
            model_name="share",
            name="topic",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="forum.topic"
            ),
        ),
        migrations.AddField(
            model_name="save",
            name="author",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddField(
            model_name="comment",
            name="anwser",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="forum.answer"
            ),
        ),
        migrations.AddField(
            model_name="comment",
            name="author",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="forum_comments",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="comment",
            name="media",
            field=models.ManyToManyField(blank=True, to="ressource.media"),
        ),
        migrations.AddField(
            model_name="answer",
            name="author",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="forum_answers",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="answer",
            name="evaluations",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="assessment_answers",
                to="assessment.evaluation",
            ),
        ),
        migrations.AddField(
            model_name="answer",
            name="media",
            field=models.ManyToManyField(blank=True, to="ressource.media"),
        ),
        migrations.AddField(
            model_name="answer",
            name="topics",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="forum_answers",
                to="forum.topic",
            ),
        ),
    ]
