import { PreparedStatement } from "pg-promise";
import { db } from "~/service/pg.server";

async function getAllUsers() {
    let res = await db.any(`SELECT u.user_id, u.email, p."password"
    FROM public.users AS u
    JOIN public.passwords AS p ON u.user_id = p.user_id`);
    try {
        return res;
    } catch (error) {
        return error;
    }
}

let insertUserEmail = new PreparedStatement({
    name: "insert-user-email",
    text: `INSERT INTO public.users(email) VALUES($1) RETURNING user_id, email`,
});

let insertUserPassword = new PreparedStatement({
    name: "insert-user-password",
    text: `INSERT INTO public."passwords"(user_id, password) VALUES($2, $1)`,
});

async function createNewUser(email: string, password: string) {
    insertUserEmail.values = [email];
    insertUserPassword.values = [password];
    try {
        return await db.tx(async (t) => {
            let writeGetNewUser = await t.one(insertUserEmail);
            let { user_id: userId, email: userEmail } = writeGetNewUser;
            insertUserPassword.values.push(userId);
            await t.none(insertUserPassword);
            return { userId, userEmail };
        });
    } catch (error) {
        return error;
    }
}

export { getAllUsers, createNewUser };
