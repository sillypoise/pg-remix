import {
    type ActionArgs,
    json,
    redirect,
    type LoaderArgs,
} from "@remix-run/node";
import { Form } from "@remix-run/react";
import { z } from "zod";
import { getUserByEmail } from "~/models/session.model.server";
import { commitSession, getSession } from "~/session.server";

// runs on POST
export async function action({ request }: ActionArgs) {
    try {
        // regardless get session cookie, we will be writing on it
        let session = await getSession(request.headers.get("Cookie"));

        // get form values and validate
        let form = await request.formData();
        let email = z.string().parse(form.get("email"));
        let password = z.string().parse(form.get("password"));

        // check if credentials valid
        let validCredentials = await validateCredentials(email, password);

        // invalid: set flash cookie session with error and redirect to /login
        if (!validCredentials) {
            session.flash("error", "Invalid username/password");
            return redirect("/login", {
                headers: {
                    "Set-Cookie": await commitSession(session),
                },
            });
        }

        // valid: get user_id with email, redirec to authorized resource and set cookie sesssion value with it
        let user = await getUserByEmail(email);
        session.set("userId", user.user_id);

        return redirect("/secret", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    } catch (error) {
        console.log("Invalid username/password", error);
        // return catched error
        return json({ error });
    }
}

// runs on GET
export async function loader({ request }: LoaderArgs) {
    // regardless get session cookie
    let session = await getSession(request.headers.get("Cookie"));

    // if valid session redirect to authorized resource
    if (session.has("userId")) return redirect("/secret");

    // no valid session, load error msg into UI
    let data = { error: session.get("error") };

    // return error msg and set session cookie we retrieved
    return json(data, {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}

export default function LoginPage() {
    return (
        <Form action="" method="post">
            <label htmlFor="email">Username:</label>
            <input
                type="email"
                name="email"
                id="email"
                // required
                placeholder="name@mail.com"
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                // required
            />
            <button type="submit">Login</button>
        </Form>
    );
}

async function validateCredentials(email: string, password: string) {
    try {
        if (false) throw new Error();
        return true;
    } catch (error) {
        console.log(error);
    }
}
