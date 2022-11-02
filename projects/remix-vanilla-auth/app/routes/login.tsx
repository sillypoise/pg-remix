import { json, LoaderArgs, redirect, type ActionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
    commitSession,
    createUserSession,
    destroySession,
    getSession,
} from "~/session.server";

// export async function action({ request }: ActionArgs) {
//     let body = Object.fromEntries(new URLSearchParams(await request.text()));
//     let errors = [];

//     if (!body["login:email"]) {
//         errors.push({
//             field: "email",
//             message: "email is required",
//         });
//     }
//     if (!body["login:password"]) {
//         errors.push({
//             field: "password",
//             message: "password is required",
//         });
//     }

//     let session = await getSession(request.headers.get("Cookie"));

//     if (errors.length) {
//         session.flash("errors", JSON.stringify(errors));
//         return redirect("/login", {
//             headers: {
//                 "Set-Cookie": await commitSession(session),
//             },
//         });
//     }
//     return redirect("/");
// }

export async function action({ request }: ActionArgs) {
    let session = await getSession(request.headers.get("Cookie"));

    let form = await request.formData();
    let email = form.get("login:email");
    let password = form.get("login:password");

    // let userId = await validateCredentials(email, password);
    return { form: "Buya" };
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
            </article>
        </main>
    );
}

function Login() {
    return (
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
            <label htmlFor="signup:pw">Password</label>
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
