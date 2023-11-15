CREATE TABLE IF NOT EXISTS "verification" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(6) NOT NULL,
	"validTill" timestamp DEFAULT now() + interval '1 minute'
);
