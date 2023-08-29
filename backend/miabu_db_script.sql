CREATE TABLE IF NOT EXISTS "auth_permission"(
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "content_type_id" integer NOT NULL REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED,
  "codename" varchar(100) NOT NULL,
  "name" varchar(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS "user_newuser"(
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "password" varchar(128) NOT NULL,
  "last_login" datetime NULL,
  "is_superuser" bool NOT NULL,
  "email" varchar(254) NOT NULL UNIQUE,
  "username" varchar(150) NOT NULL UNIQUE,
  "last_name" varchar(150) NOT NULL,
  "first_name" varchar(150) NOT NULL,
  "about" text NOT NULL,
  "is_staff" bool NOT NULL,
  "is_active" bool NOT NULL,
  "profile_picture" varchar(200) NULL,
  "date_joined" datetime NOT NULL,
  "is_social_network" bool NOT NULL
);
CREATE TABLE IF NOT EXISTS "user_newuser_user_permissions"(
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "newuser_id" bigint NOT NULL REFERENCES "user_newuser"("id") DEFERRABLE INITIALLY DEFERRED,
  "permission_id" integer NOT NULL REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "assessment_domain"(
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" varchar(100) NOT NULL
);
CREATE TABLE IF NOT EXISTS "assessment_establishment"(
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" varchar(100) NOT NULL,
  "description" varchar(100) NOT NULL,
  "location" varchar(100) NOT NULL,
  "create_at" datetime NOT NULL,
  "update_at" datetime NOT NULL
);
CREATE TABLE IF NOT EXISTS "assessment_level"(
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" varchar(100) NOT NULL
);
CREATE TABLE IF NOT EXISTS "assessment_session"(
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "session_type" varchar(100) NOT NULL
);
CREATE TABLE IF NOT EXISTS "assessment_course"(
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" varchar(100) NOT NULL,
  "domain_id" bigint NULL REFERENCES "assessment_domain"("id") DEFERRABLE INITIALLY DEFERRED,
  "establishment_id" bigint NOT NULL REFERENCES "assessment_establishment"("id") DEFERRABLE INITIALLY DEFERRED,
  "level_id" bigint NULL REFERENCES "assessment_level"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "forum_comment"(
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "content" text NOT NULL,
  "create_at" datetime NOT NULL,
  "last_update_at" datetime NOT NULL,
  "delete_at" datetime NOT NULL,
  "is_replied" bool NOT NULL,
  "anwser_id" bigint NOT NULL REFERENCES "forum_answer"("id") DEFERRABLE INITIALLY DEFERRED,
  "author_id" bigint NOT NULL REFERENCES "user_newuser"("id") DEFERRABLE INITIALLY DEFERRED
);

