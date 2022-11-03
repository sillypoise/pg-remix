import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createNewUser } from "~/models/session.model.server";
import { hashPassword } from "~/service/argon2.server";
import { requireUserSession } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
    let email = "buyga@email.com";
    let password = "fufah";
    return requireUserSession(request, async (session) => {
        let hash = await hashPassword(password);
        let newUser = await createNewUser(email, hash!);
        console.dir(newUser);
        return json(newUser);
    });
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
