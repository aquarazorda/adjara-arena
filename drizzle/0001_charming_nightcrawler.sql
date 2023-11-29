DO $$ BEGIN
 CREATE TYPE "channel" AS ENUM('sms', 'email');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "reminders" ADD COLUMN "channel" "channel";