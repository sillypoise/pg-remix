import { db } from "../utils/db.server";

function getPeople() {
    let stmt = db.prepare("SELECT rowid, firstName, lastName FROM people");
    let data = stmt.all();
    return data;
}

function addPerson(firstName: string, lastName: string) {
    let stmt = db.prepare(
        "INSERT INTO people (firstName, lastName) VALUES (?, ?)"
    );
    let info = stmt.run(firstName, lastName);
    console.log(info.changes);

    return info.changes;
}

export { addPerson, getPeople };
