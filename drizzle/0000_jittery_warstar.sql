DO $$ BEGIN
 CREATE TYPE "activityType" AS ENUM('auth_success', 'forgot_password_success');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "verification_type" AS ENUM('email', 'phoneNumber');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accepted_terms" (
	"id" serial NOT NULL,
	"event_type" varchar(100),
	"value" boolean DEFAULT false,
	"user_id" varchar(15),
	"user_agent" text,
	"ip" varchar(20),
	"register_data" date,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "activity_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"activityType" "activityType" NOT NULL,
	"description" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cms_users" (
	"id" serial NOT NULL,
	"role_id" integer,
	"email" varchar(150),
	"password" varchar(200),
	"full_name" varchar(200),
	"position" varchar(200),
	"created_at" date DEFAULT now(),
	CONSTRAINT "cms_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_key" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"hashed_password" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_session" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_user" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"full_name" varchar(100) NOT NULL,
	"date_of_birth" date NOT NULL,
	"phone_number" varchar(15),
	"email" varchar(100),
	"address" text,
	"personal_id" bigint,
	CONSTRAINT "auth_user_username_unique" UNIQUE("username"),
	CONSTRAINT "auth_user_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "auth_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(6) NOT NULL,
	"value" varchar(50) NOT NULL,
	"verification_type" "verification_type" NOT NULL,
	"validTill" timestamp DEFAULT now() + interval '1 minute'
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accepted_terms" ADD CONSTRAINT "accepted_terms_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_key" ADD CONSTRAINT "user_key_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_session" ADD CONSTRAINT "user_session_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
