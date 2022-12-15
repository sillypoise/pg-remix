import { type LoaderArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { parse } from "cookie";

export async function loader({ request, params }: LoaderArgs) {
    // mise-en-scene
    const KRATOS_BASE_URL = process.env["KRATOS_PUBLIC_URL"];
    const url = new URL(request.url);
    const cookies = request.headers.get("Cookie");

    // check for session cookie
    if (cookies) {
        const parsedCookies = parse(cookies);
        const cookiesKeys = Object.keys(parsedCookies);

        // check for ory_kratos_session
        const kratosSessionKey = cookiesKeys.find(
            (key) => key === "ory_kratos_session"
        );
        if (parsedCookies["ory_kratos_session"]) {
            let kratosSession = parsedCookies["ory_kratos_session"];
            // TODO: refactor into model function
            const resWhoami = await fetch(
                `${KRATOS_BASE_URL}/sessions/whoami`,
                {
                    headers: {
                        Cookie: `${kratosSessionKey}=${kratosSession}`,
                    },
                }
            );
            console.dir(resWhoami, { depth: 2 });
            let data = await resWhoami.json();
            return { session: data };
        }
    }

    return {};
}

export default function Index() {
    const data = useLoaderData();

    return (
        <main className="mlb-l">
            <article className="center stack">
                <h1 className="text-2">Remix + Ory Kratos</h1>
                <ul>
                    <li>
                        <Link to="/secret">Secret</Link>
                    </li>
                    <li>
                        <Link to="/open-info">Open Info</Link>
                    </li>
                    <li>
                        <Link to="/registration">Registration</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
                <h3>who am i?</h3>
                {data.session ? (
                    <pre>{JSON.stringify(data, null, 4)}</pre>
                ) : (
                    <pre>no session found</pre>
                )}
            </article>
        </main>
    );
}
