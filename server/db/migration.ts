import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, pgClient } from ".";

console.log("Running migrations...")
await migrate(db, { migrationsFolder: "drizzle" });
await pgClient.end();
console.log("Migrations complete.")

process.exit();