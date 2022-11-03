import pgPromise from "pg-promise";
import type { IConnectionParameters } from "pg-promise/typescript/pg-subset";

const pgp = pgPromise();
const cn: IConnectionParameters = {
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: process.env["PG_USER"],
    password: process.env["PG_PASSWORD"],
    max: 30,
};
const db = pgp(cn);
console.log("😡 db connecting");

export { db };
