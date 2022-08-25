import { join } from "path";
import Database from "better-sqlite3";

const db = new Database(join(process.cwd(), "/db/people.db"));

export { db };
