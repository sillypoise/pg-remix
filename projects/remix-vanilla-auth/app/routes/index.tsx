import { Link } from "@remix-run/react";
import {} from "~/session.server";

export default function Index() {
    return (
        <main className="mlb-l">
            <article className="center stack">
                <h2>Auth remix.</h2>
                <Link to="/login">Go to login</Link>
                <p>session:</p>
                {/* <pre>{JSON.stringify(userSession, null, 4)}</pre> */}
            </article>
        </main>
    );
}
