import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema.mjs";
import config from "../config.mjs";

const sqlite = new Database(config.DB_URL);

export const db = drizzle(sqlite, {schema});