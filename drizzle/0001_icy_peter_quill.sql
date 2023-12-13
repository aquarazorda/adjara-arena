CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"parentId" integer,
	"sort" integer NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar,
	"icon" varchar,
	"createdAt" timestamp (2) DEFAULT now()
);
