import { Pool, type PoolClient, type QueryResultRow } from "pg";

/**
 * Shared PostgreSQL connection pool.
 *
 * The pool is created lazily and cached on `globalThis` so that Next.js
 * dev-mode hot reloads reuse a single pool instead of exhausting
 * Postgres connections.
 */

const connectionString =
  process.env.DATABASE_URL ??
  `postgresql://${process.env.POSTGRES_USER ?? "postgres"}:${
    process.env.POSTGRES_PASSWORD ?? "mushai_local_dev"
  }@${process.env.POSTGRES_HOST ?? "127.0.0.1"}:${
    process.env.POSTGRES_PORT ?? "5432"
  }/${process.env.POSTGRES_DB ?? "mush_ai"}`;

const globalForDb = globalThis as unknown as { __mushPool?: Pool };

function createPool(): Pool {
  return new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });
}

export const pool: Pool = globalForDb.__mushPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__mushPool = pool;
}

/** Run a parameterised query against the pool. */
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: readonly unknown[] = [],
): Promise<T[]> {
  const result = await pool.query<T>(text, params as unknown[]);
  return result.rows;
}

/** Run a parameterised query and return the first row, or null. */
export async function queryOne<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: readonly unknown[] = [],
): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows[0] ?? null;
}

/**
 * Run `fn` inside a single transaction, committing on success and
 * rolling back if anything throws.
 */
export async function withTransaction<T>(
  fn: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
