import { join } from "path";
import Database from "better-sqlite3";

const db = new Database(join(process.cwd(), "/db/people.db"));

function getPeople() {
    let data = db.prepare("SELECT * FROM people").all();
    return data;
}

export { db, getPeople };
