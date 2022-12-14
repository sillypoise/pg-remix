import { Link } from "@remix-run/react";

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
