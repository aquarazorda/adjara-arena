import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from ".";

console.log("Running migrations...")
await migrate(db, { migrationsFolder: "drizzle" });
console.log("Migrations complete.")