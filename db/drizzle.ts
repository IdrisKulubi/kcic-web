import * as schema from "./schema";
import { drizzle } from "../node_modules/drizzle-orm/neon-http/driver.js";

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("POSTGRES_URL is not configured");
}

// Schema export includes Drizzle 1.0 relations; rc typings do not infer them on this overload yet.
// @ts-expect-error DrizzlePgConfig inference for combined schema module
const db = drizzle(connectionString, { schema });

export default db;
