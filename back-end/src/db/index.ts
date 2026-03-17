import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./auth-schema";


if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool, schema  });
export default db