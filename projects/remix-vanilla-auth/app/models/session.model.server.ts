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

async function getUserById(userId: string) {
    try {
        let user = await db.one(
            `SELECT user_id, email FROM public.users WHERE user_id = $1`,
            [userId]
        );
        if (!user) throw new Error();
        return user;
    } catch (error) {
        console.log("can't find user");
    }
}

async function getUserByEmail(email: string) {
    try {
        let user = await db.one(
            `SELECT user_id, email FROM public.users WHERE email = $1`,
            [email]
        );
        if (!user) throw new Error();
        return user;
    } catch (error) {
        console.log("can't find user", error);
    }
}

async function getHashByUserId(userId: string) {
    try {
        let hash = await db.one(
            `SELECT password FROM public.passwords WHERE user_id = $1`,
            [userId]
        );
        if (!hash) throw new Error();
        return hash.password;
    } catch (error) {
        console.log("can't find hash");
    }
}

export {
    getAllUsers,
    createNewUser,
    getUserById,
    getUserByEmail,
    getHashByUserId,
};
