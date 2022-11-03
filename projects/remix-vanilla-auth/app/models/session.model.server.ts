import { db } from "~/service/pg.server";

async function getAllUsers() {
    let res = await db.any("SELECT * FROM public.users");
    try {
        return res;
    } catch (error) {
        return error;
    }
}

export { getAllUsers };
