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
    return info.changes;
}

function deletePerson(rowid: string) {
    let stmt = db.prepare("DELETE FROM people WHERE rowid == ?");
    let info = stmt.run(rowid);
    return info.changes;
}

export { addPerson, getPeople, deletePerson };
