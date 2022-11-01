import { json, type LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getUserSession } from "~/session";

export async function loader({ request }: LoaderArgs) {
    let userSession = await getUserSession();
    return json({ userSession });
}

export default function Index() {
    let { userSession } = useLoaderData();
    // console.log(userSession);

    return (
        <main className="mlb-l">
            <article className="center stack">
                <h2>Auth remix.</h2>
                <p>session:</p>
                <pre>{JSON.stringify(userSession, null, 4)}</pre>
                {userSession ? <p>Wilkmmen User!</p> : <SignUp />}
                {userSession ? (
                    <p>apparently session null is truthy now?</p>
                ) : (
                    <p>no sesh for you!</p>
                )}
            </article>
        </main>
    );
}

function SignUp() {
    return (
        <>
            <h3>Sign Up!</h3>
            <Form action="" className="stack">
                <label htmlFor="signup:email">Username:</label>
                <input
                    type="email"
                    name="signup:email"
                    id="signup:email"
                    className="max-is-[20ch] rounded-md p-3xs"
                />
                <label htmlFor="signup:pw">Password</label>
                <input
                    type="password"
                    name="signup:password"
                    id="signup:password"
                    className="max-is-[20ch] rounded-md p-3xs"
                />
                <button
                    type="submit"
                    className="max-is-[20ch] rounded-md bg-dark-gray-5 hover:bg-dark-gray-6"
                >
                    Sign me up!
                </button>
            </Form>
        </>
    );
}
