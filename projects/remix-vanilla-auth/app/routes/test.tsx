import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";
import {
    createNewUser,
    getHashByUserId,
    getUserById,
} from "~/models/session.model.server";
import { hashPassword } from "~/service/argon2.server";
import { requireUserSession } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
    try {
        // let email = "user@example.com";
        let email = 123;
        let test = z.string().parse(email);
        console.dir(test);
        return { hello: "world" };
    } catch (error) {
        return { error };
    }
}

export default function Secret() {
    let newUser = useLoaderData();
    return (
        <main className="mlb-l">
            <article className="center stack">
                <h2>TESTING</h2>
                {/* <p>Welcome {newUser.userId} </p>
                <p>This is the email you signed up with: {newUser.userEmail}</p> */}
                <pre>{JSON.stringify(newUser, null, 4)}</pre>
            </article>
        </main>
    );
}
