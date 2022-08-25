import { join } from "path";
import Database from "better-sqlite3";

const db = new Database(join(process.cwd(), "/db/people.db"));

// function getPeople() {
//     let stmt = db.prepare("SELECT rowid, firstName, lastName FROM people");
//     let data = stmt.all();
//     return data;
// }

// function addPerson(firstName: string, lastName: string) {
//     let stmt = db.prepare(
//         "INSERT INTO people (firstName, lastName) VALUES (?, ?)"
//     );
//     let info = stmt.run(firstName, lastName);
//     console.log(info.changes);

//     return info.changes;
// }

export { db };
