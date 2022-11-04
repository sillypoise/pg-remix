import { redirect, type ActionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { destroySession, getSession } from "~/session.server";

export async function action({ request }: ActionArgs) {
    // get session cookie
    let session = await getSession(request.headers.get("Cookie"));
    // return response that deletes session cookie and redirect to /login
    return redirect("/login", {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });
}

export default function LogoutPage() {
    return (
        <main className="mlb-l">
            <article className="center stack">
                <h3>Are you sure you want to logout?</h3>
                <Form method="post">
                    <button
                        type="submit"
                        className="bg-scheme-dark-neutral-surface-4 p-2xs rounded-md"
                    >
                        Logout
                    </button>
                </Form>
                <Link to="/secret">Never mind</Link>
            </article>
        </main>
    );
}

export function Logout() {
    return (
        <article>
            <Form method="post">
                <button type="submit">Logout</button>
            </Form>
            <Link to="/secret">Never mind</Link>
        </article>
    );
}
