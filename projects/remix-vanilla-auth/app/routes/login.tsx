import { json, LoaderArgs, redirect, type ActionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { commitSession, getSession } from "~/session";

export async function action({ request }: ActionArgs) {
    let body = Object.fromEntries(new URLSearchParams(await request.text()));
    let errors = [];

    if (!body["login:email"]) {
        errors.push({
            field: "email",
            message: "email is required",
        });
    }
    if (!body["login:password"]) {
        errors.push({
            field: "password",
            message: "password is required",
        });
    }

    let session = await getSession(request.headers.get("Cookie"));

    if (errors.length) {
        session.flash("errors", JSON.stringify(errors));
        return redirect("/login", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }
    return redirect("/");
}

export async function loader({ request }: LoaderArgs) {
    let session = await getSession(request.headers.get("Cookie"));

    return json({ session: JSON.parse(session.data.errors) });
}

export default function Login() {
    let { session } = useLoaderData();
    console.log(session);

    return (
        <main className="mlb-l">
            <article className="center stack">
                <h3>Please login to see supah secret infohmazione</h3>
                <Form action="" method="post" className="stack">
                    <label htmlFor="login:email">Username:</label>
                    <input
                        type="email"
                        name="login:email"
                        id="login:email"
                        // required
                        placeholder="name@mail.com"
                        className="max-is-[20ch] rounded-md p-3xs"
                    />
                    <pre>{JSON.stringify(session[0])}</pre>
                    <label htmlFor="signup:pw">Password</label>
                    <input
                        type="password"
                        name="login:password"
                        id="login:password"
                        // required
                        className="max-is-[20ch] rounded-md p-3xs"
                    />
                    <pre>{JSON.stringify(session[1])}</pre>
                    <button
                        type="submit"
                        className="max-is-[20ch] rounded-md bg-dark-gray-5 hover:bg-dark-gray-6"
                    >
                        Login
                    </button>
                </Form>
            </article>
        </main>
    );
}
