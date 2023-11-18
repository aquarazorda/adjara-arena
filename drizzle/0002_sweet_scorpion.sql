DO $$ BEGIN
 CREATE TYPE "activityType" AS ENUM('auth_success', 'forgot_password_success');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
DO $$ BEGIN
 ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
