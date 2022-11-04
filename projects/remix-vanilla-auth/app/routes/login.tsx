import {
    json,
    type LoaderArgs,
    redirect,
    type ActionArgs,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { getHashByUserId, getUserByEmail } from "~/models/session.model.server";
import { validatePassword } from "~/service/argon2.server";
import { commitSession, getSession } from "~/session.server";

async function validateCredentials(email: string, password: string) {
    try {
        let user = await getUserByEmail(email);
        let hash = await getHashByUserId(user.user_id);

        if (!user) throw new Error();
        if (!hash) throw new Error();
        let validPassword = validatePassword(hash, password);
        if (!validPassword) throw new Error();
        return validPassword;
    } catch (error) {
        console.log("Invalid username/password", error);
    }
}

export async function action({ request }: ActionArgs) {
    try {
        let session = await getSession(request.headers.get("Cookie"));

        let form = await request.formData();
        let email = z.string().parse(form.get("login:email"));
        let password = z.string().parse(form.get("login:password"));

        let validCredentials = await validateCredentials(email, password);

        if (!validCredentials) {
            session.flash("error", "Invalid username/password");
            return redirect("/login", {
                headers: {
                    "Set-Cookie": await commitSession(session),
                },
            });
        }

        let user = await getUserByEmail(email);
        session.set("userId", user.user_id);

        return redirect("/secret", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    } catch (error) {
        return json({ error });
    }
}

export async function loader({ request }: LoaderArgs) {
    let session = await getSession(request.headers.get("Cookie"));

    if (session.has("userId")) {
        return redirect("/secret");
    }

    // assumes there is an error
    let data = { error: session.get("error") };

    return json(data, {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}

export default function LoginPage() {
    let session = useLoaderData();
    console.dir(session);

    return (
        <main className="mlb-l">
            <article className="center stack">
                <h3>Please login to see supah secret infohmazione</h3>
                <div className="cluster">
                    <p>session:</p>
                    <pre>{JSON.stringify(session, null, 4)}</pre>
                </div>
                <Login />
                <p>No account yet? </p>
                <button className="bg-scheme-dark-neutral-surface-4 p-2xs rounded-md max-is-max">
                    <Link to="/signup">Join us!</Link>
                </button>
            </article>
        </main>
    );
}

function Login() {
    return (
        <Form action="" method="post" className="stack">
            <label htmlFor="login:email">Email:</label>
            <input
                type="email"
                name="login:email"
                id="login:email"
                // required
                placeholder="name@mail.com"
                className="max-is-[20ch] rounded-md p-3xs"
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="login:password"
                id="login:password"
                // required
                className="max-is-[20ch] rounded-md p-3xs"
            />
            <button
                type="submit"
                className="max-is-[20ch] rounded-md bg-dark-gray-5 hover:bg-dark-gray-6"
            >
                Login
            </button>
        </Form>
    );
}
