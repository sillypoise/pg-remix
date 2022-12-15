import { Response, type LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { kratosSession } from "~/session.server";
import { createCookie } from "@remix-run/node";
import { parse } from "cookie";
import { json } from "stream/consumers";

export async function loader({ request, params }: LoaderArgs) {
    // let sesh = await kratosSession.parse(request.headers.get("Cookie"));
    let sesh = parse(request.headers.get("Cookie"));
    let testu = await kratosSession.parse(request.headers.get("Cookie"));
    // console.log(sesh);
    // console.log(testu);

    return {};
}

export default function Index() {
    return (
        <main className="mlb-l">
            <article className="center stack">
                <h1 className="text-2">Remix + Ory Kratos</h1>
                <ul>
                    <li>
                        <Link to="/secret">Secret</Link>
                    </li>
                    <li>
                        <Link to="/registration">Registration</Link>
                    </li>
                </ul>
            </article>
        </main>
    );
}
