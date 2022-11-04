import { type ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { z } from "zod";
import { getSession } from "~/session.server";

export async function action({ request }: ActionArgs) {
    let session = await getSession(request.headers.get("Cookie"));

    let form = await request.formData();
    let email = await z.string().parse(form.get("signup:email"));
    let password = await z.string().parse(form.get("signup:password"));

    // TODO robust input validation

    // TODO hash password

    // TODO write email and password to db

    // TODO create and set session cookie, redirect to /secret

    // TODO handle error path if invalid credentials
}

export default function SignUpPage() {
    return (
        <main className="mlb-l">
            <article className="center stack">
                <h3>Join us!</h3>
                <p className="text-00">We promise we're not a cult</p>
                <SignUp />
            </article>
        </main>
    );
}

function SignUp() {
    return (
        <Form action="" method="post" className="stack">
            <label htmlFor="signup:email">Email:</label>
            <input
                type="email"
                name="signup:email"
                id="signup:email"
                // required
                placeholder="name@mail.com"
                className="max-is-[20ch] rounded-md p-3xs"
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="signup:password"
                id="signup:password"
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
