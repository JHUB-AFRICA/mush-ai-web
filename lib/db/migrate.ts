/**
 * Applies lib/db/schema.sql to the database in DATABASE_URL.
 *
 *   bun run db:migrate
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Pool } from "pg";

const schemaPath = join(process.cwd(), "lib", "db", "schema.sql");
const schema = readFileSync(schemaPath, "utf8");

const connectionString =
  process.env.DATABASE_URL ??
  `postgresql://${process.env.POSTGRES_USER ?? "postgres"}:${
    process.env.POSTGRES_PASSWORD ?? "mushai_local_dev"
  }@${process.env.POSTGRES_HOST ?? "127.0.0.1"}:${
    process.env.POSTGRES_PORT ?? "5432"
  }/${process.env.POSTGRES_DB ?? "mush_ai"}`;

const pool = new Pool({ connectionString });

async function main() {
  console.log(`Applying schema to ${connectionString.replace(/:[^:@]*@/, ":***@")}`);
  await pool.query(schema);
  console.log("Schema applied.");
}

main()
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
