# Generated by Django 4.1 on 2023-07-03 18:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("assessment", "0003_alter_evaluation_options"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="evaluation",
            options={},
        ),
        migrations.AddIndex(
            model_name="course",
            index=models.Index(fields=["name"], name="assessment__name_e54181_idx"),
        ),
        migrations.AddIndex(
            model_name="domain",
            index=models.Index(fields=["name"], name="assessment__name_cf1b81_idx"),
        ),
        migrations.AddIndex(
            model_name="establishment",
            index=models.Index(fields=["name"], name="assessment__name_80d7a9_idx"),
        ),
        migrations.AddIndex(
            model_name="evaluation",
            index=models.Index(fields=["title"], name="assessment__title_1a6d3e_idx"),
        ),
        migrations.AddIndex(
            model_name="evaluation",
            index=models.Index(fields=["slug"], name="assessment__slug_21779d_idx"),
        ),
        migrations.AddIndex(
            model_name="evaluation",
            index=models.Index(
                fields=["content"], name="assessment__content_a83d02_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="evaluation",
            index=models.Index(
                fields=["author"], name="assessment__author__4406c5_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="evaluation",
            index=models.Index(fields=["status"], name="assessment__status_21c3a7_idx"),
        ),
        migrations.AddIndex(
            model_name="evaluation",
            index=models.Index(fields=["level"], name="assessment__level_i_474e37_idx"),
        ),
        migrations.AddIndex(
            model_name="evaluation",
            index=models.Index(
                fields=["domain"], name="assessment__domain__db1b0c_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="evaluation",
            index=models.Index(
                fields=["course"], name="assessment__course__b5b46f_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="evaluation",
            index=models.Index(
                fields=["establishment"], name="assessment__establi_d6796a_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="level",
            index=models.Index(fields=["name"], name="assessment__name_11f6c0_idx"),
        ),
    ]